import type { AddressInfo } from 'node:net';

import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { serveAPI, useEnv, useShutdown } from 'ohnejs';
import { joinPath } from 'ohnejs/utils';

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
}

/**
 * The backend's API, served from this process on an in-memory database the seed has filled.
 */
export interface TestApp {
  /**
   * Sends a `GET` to the API and reads the answer.
   */
  get(path: string): Promise<TestResponse>;

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

  return {
    async get(path) {
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
      const type = response.headers.get('content-type');
      const body = type?.startsWith('application/json') ? await response.json() : null;
      if (body === null) await response.body?.cancel();
      return { status: response.status, type, body };
    },

    async stop() {
      await useShutdown().run();
      useShutdown().unwatch();
      await rm(uploads, { recursive: true, force: true });
    },
  };
}
