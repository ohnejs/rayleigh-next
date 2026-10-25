import { strictEqual } from 'node:assert';
import { after, before, describe, it } from 'node:test';
import { query, useEnv } from 'ohnejs';

import { startApp, type TestApp } from '../_app.ts';

describe('seed in production', () => {
  let app: TestApp;

  before(async () => {
    useEnv().set('NODE_ENV', 'production');
    app = await startApp();
  });

  after(() => app.stop());

  it('seeds nothing, so a new install starts empty', async () => {
    strictEqual(await query('Pages').count(), 0);
    strictEqual(await query('Posts').count(), 0);
    strictEqual(await query('Users').count(), 0);
  });
});
