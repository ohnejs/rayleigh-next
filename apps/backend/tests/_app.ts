import type { AddressInfo } from 'node:net';

import { ok, strictEqual } from 'node:assert';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { query, serveAPI, useEnv, useShutdown } from 'ohnejs';
import { isUndefined, joinPath } from 'ohnejs/utils';

/**
 * One answer from the backend under test.
 */
export interface TestResponse {
  /**
   * The HTTP status.
   */
  status: number;

  /**
   * The `content-type` header.
   */
  type: string | null;

  /**
   * The parsed JSON body, or `null` when the body is not JSON.
   */
  body: any;

  /**
   * The `session=...` pair the answer set, ready to send back as a `cookie` header.
   */
  cookie?: string;
}

/**
 * What a test request sends besides its method and path.
 */
export interface TestRequest {
  /**
   * The body, sent as JSON.
   */
  json?: unknown;

  /**
   * The `cookie` header, such as a `session=...` pair from `signIn`.
   */
  cookie?: string;

  /**
   * More request headers.
   */
  headers?: Record<string, string>;
}

/**
 * The backend's API, served from this process on an in-memory database the seed has filled.
 */
export interface TestApp {
  /**
   * Sends one request to the API and reads the answer.
   */
  request(method: string, path: string, options?: TestRequest): Promise<TestResponse>;

  /**
   * Sends a `GET` to the API and reads the answer.
   */
  get(path: string, options?: TestRequest): Promise<TestResponse>;

  /**
   * Creates a user without a role and signs them in through `POST /auth/login`, returning the session cookie.
   */
  signIn(email: string): Promise<string>;

  /**
   * Signs in as the seeded admin, after giving it a known password in place of the seed's random one.
   */
  signInAdmin(): Promise<string>;

  /**
   * Shuts the API down, closes the database and deletes the uploaded files.
   */
  stop(): Promise<void>;
}

/**
 * Boots the API on a free port, with an in-memory database, uploads in a temp folder, and no output.
 * Codegen is skipped, since `ohne prepare` already wrote the types.
 */
export async function startApp(): Promise<TestApp> {
  const uploads = await mkdtemp(joinPath(tmpdir(), 'rayleigh-uploads-'));
  useEnv().set('SILENT', true);
  useEnv().set('SKIP_CODEGEN', true);
  useEnv().set('DATABASE', ':memory:');
  useEnv().set('UPLOADS_URL', uploads);
  useEnv().set('PORT', 0);
  const { server } = await serveAPI(joinPath(import.meta.dirname, '..'));
  const { port } = server.address() as AddressInfo;

  const password = 'test-password';
  const app: TestApp = {
    async request(method, path, { json, cookie, headers: extra } = {}) {
      const headers = new Headers(extra);
      const init: RequestInit = { method, headers };
      if (!isUndefined(cookie)) headers.set('cookie', cookie);
      if (!isUndefined(json)) {
        headers.set('content-type', 'application/json');
        init.body = JSON.stringify(json);
      }
      const response = await fetch(`http://127.0.0.1:${port}${path}`, init);
      const type = response.headers.get('content-type');
      const body = type?.startsWith('application/json') ? await response.json() : null;
      if (body === null) await response.body?.cancel();
      const session = response.headers.getSetCookie().find((line) => line.startsWith('session='));
      return { status: response.status, type, body, cookie: session?.split(';', 1)[0] };
    },

    get(path, options) {
      return app.request('GET', path, options);
    },

    async signIn(email) {
      await query('Users').createOrThrow({ email, password });
      return login(email);
    },

    async signInAdmin() {
      await query('Users').where('email', 'admin@example.com').updateOrThrow({ password });
      return login('admin@example.com');
    },

    async stop() {
      await useShutdown().run();
      useShutdown().unwatch();
      await rm(uploads, { recursive: true, force: true });
    },
  };

  async function login(email: string): Promise<string> {
    const { status, cookie } = await app.request('POST', '/auth/login', {
      json: { email, password },
    });
    strictEqual(status, 200, `Sign-in as ${email} failed`);
    ok(cookie);
    return cookie;
  }

  return app;
}
