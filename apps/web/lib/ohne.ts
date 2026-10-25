import { createOhneNext } from '@ohnejs/next';

// `ohne.ts` holds the types of your pages and blocks. The CMS writes it, so never edit it by hand.
import type { CMS } from '../ohne';

// The one connection to your CMS. Every page, block and route handler reads through it.
// `OHNE_API` is read when the server runs, so one build serves every environment.
export const ohne = createOhneNext<CMS>({ api: process.env.OHNE_API ?? 'http://localhost:9001' });
