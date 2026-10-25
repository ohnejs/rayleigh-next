import { ok, strictEqual } from 'node:assert';
import { after, before, describe, it } from 'node:test';
import { query } from 'ohnejs';

import { startApp, type TestApp } from '../_app.ts';

describe('Settings', () => {
  let app: TestApp;
  let visitor: string;
  let admin: string;
  let path: string;

  before(async () => {
    app = await startApp();
    visitor = await app.signIn('thrall@orgrimmar.example');
    admin = await app.signInAdmin();
    path = `/collections/settings/${(await query('Settings').findFirst()).UUID}`;
    await query('Settings').update({
      recaptcha: true,
      recaptchaSiteKey: 'site-key',
      recaptchaSecretKey: 'secret-key',
    });
  });

  after(() => app.stop());

  it('shows the site key to everyone, and the secret key to nobody', async () => {
    for (const [who, cookie] of [['anonymous'], ['visitor', visitor], ['admin', admin]]) {
      for (const read of [path, '/cms/records/Settings']) {
        const { status, body } = await app.get(read, { cookie });
        strictEqual(status, 200, `${who} ${read}`);
        strictEqual(body.recaptchaSiteKey, 'site-key', `${who} ${read}`);
        ok(!('recaptchaSecretKey' in body), `${who} ${read}`);
      }
      const asked = await app.get(`${path}?select=[recaptchaSecretKey]`, { cookie });
      strictEqual(asked.status, 400, who);
    }
  });

  it('lets only the admin replace the secret key', async () => {
    const json = { recaptchaSecretKey: 'stolen' };
    strictEqual((await app.request('PATCH', path, { json })).status, 401);
    const refused = await app.request('PATCH', path, { cookie: visitor, json });
    strictEqual(refused.status, 403);
    const secret = async () =>
      (await query('Settings').select('recaptchaSecretKey').findFirst()).recaptchaSecretKey;
    strictEqual(await secret(), 'secret-key');

    const replaced = await app.request('PATCH', path, {
      cookie: admin,
      json: { recaptchaSecretKey: 'new-secret-key' },
    });
    strictEqual(replaced.status, 200);
    ok(!('recaptchaSecretKey' in replaced.body));
    strictEqual(await secret(), 'new-secret-key');
  });
});
