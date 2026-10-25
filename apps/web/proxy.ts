import { ohne } from './lib/ohne';

// Every request passes through here first, to hand each page its path and keep a preview out of caches.
// It also serves the editor's script under `/_ohne/`.
export const proxy = ohne.proxy;

// Next reads this when it builds, so it stays a literal. It must keep covering `/_ohne/`.
export const config = { matcher: '/((?!_next/).*)' };
