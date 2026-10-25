'use server';

import type { CreateResult } from '@ohnejs/client';

import type { Creatable } from '../ohne';

import { ohne } from './ohne';

// A Server Action runs on your website's server, though the browser calls it like a function.
// It hands the message to your CMS, which checks every field, and returns the CMS's answer to the form.
// See https://ohne.dev/docs/cms/website#forms
export async function sendMessage(
  { name, email, message }: Creatable['Messages'],
  recaptcha?: string,
): Promise<CreateResult> {
  return ohne.create(
    'Messages',
    { name, email, message },
    // The backend's `recaptcha` middleware reads the token from this header.
    { headers: recaptcha ? { 'recaptcha-token': recaptcha } : {} },
  );
}
