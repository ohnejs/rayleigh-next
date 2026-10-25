import { deepStrictEqual, ok, strictEqual } from 'node:assert';
import { after, afterEach, before, describe, it } from 'node:test';
import { query } from 'ohnejs';

import { startApp, type TestApp } from '../_app.ts';

describe('Messages', () => {
  let app: TestApp;
  const message = {
    name: 'Jaina',
    email: 'jaina@theramore.example',
    message: 'Hello from Theramore.',
  };

  before(async () => {
    app = await startApp();
  });

  afterEach(() => query('Settings').update({ recaptcha: false }));

  after(() => app.stop());

  it('stores a message any visitor sends', async () => {
    const { status, body } = await app.request('POST', '/collections/messages', { json: message });
    strictEqual(status, 201);
    strictEqual(body.name, 'Jaina');
    const stored = await query('Messages').where('UUID', body.UUID).findFirst();
    strictEqual(stored?.message, 'Hello from Theramore.');
  });

  it('answers each invalid field with its own message, and stores nothing', async () => {
    const before = await query('Messages').count();
    const { status, body } = await app.request('POST', '/collections/messages', {
      json: { name: '', email: 'jaina', message: 'Hello.' },
    });
    strictEqual(status, 422);
    deepStrictEqual(Object.keys(body.data.errors).sort(), ['email', 'name']);
    strictEqual(await query('Messages').count(), before);
  });

  it('shows the messages to the admin only', async () => {
    strictEqual((await app.get('/collections/messages')).status, 401);
    const visitor = await app.signIn('thrall@orgrimmar.example');
    strictEqual((await app.get('/collections/messages', { cookie: visitor })).status, 403);
    // The website reads as an anonymous visitor, so it never sees a message either.
    strictEqual((await app.get('/cms/records/Messages')).status, 404);

    const admin = await app.get('/collections/messages', { cookie: await app.signInAdmin() });
    strictEqual(admin.status, 200);
    ok(admin.body.some((stored: { name: string }) => stored.name === 'Jaina'));
  });

  it('keeps a message as its visitor sent it', async () => {
    const { body } = await app.request('POST', '/collections/messages', { json: message });
    const { status } = await app.request('PATCH', `/collections/messages/${body.UUID}`, {
      cookie: await app.signInAdmin(),
      json: { message: 'Something else.' },
    });
    strictEqual(status, 404);
    const stored = await query('Messages').where('UUID', body.UUID).findFirst();
    strictEqual(stored?.message, 'Hello from Theramore.');
  });

  it('refuses a message without a reCAPTCHA token once the check is on', async () => {
    await query('Settings').update({
      recaptcha: true,
      recaptchaSiteKey: 'site-key',
      recaptchaSecretKey: 'secret-key',
    });
    const before = await query('Messages').count();
    const { status } = await app.request('POST', '/collections/messages', { json: message });
    strictEqual(status, 403);
    strictEqual(await query('Messages').count(), before);
  });
});
