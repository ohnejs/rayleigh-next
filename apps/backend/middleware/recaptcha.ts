import { defineMiddleware, forbidden, query } from 'ohnejs';

/**
 * What Google answers about a reCAPTCHA token.
 * See https://developers.google.com/recaptcha/docs/v3#site_verify_response
 */
interface Verdict {
  success: boolean;
  score?: number;
}

// A middleware runs before the request's own work, and a throw answers the request instead.
// `Messages` names this one on its create, so a message is checked before it is stored.
// See https://ohne.dev/docs/api/middleware#route-middleware
export default defineMiddleware(async (event) => {
  // Server code is trusted, so it may select the write-only secret key.
  const settings = await query('Settings').select('recaptcha', 'recaptchaSecretKey').findFirst();
  if (!settings.recaptcha) return;

  // The website asks reCAPTCHA for a token when the visitor sends the form, and passes it on in this header.
  const token = event.request.headers.get('recaptcha-token');
  if (!(await isPerson(token, settings.recaptchaSecretKey))) {
    throw forbidden('The spam check failed. Please try again.');
  }
});

/**
 * Asks Google whether the visitor who got `token` is likely a person.
 */
async function isPerson(token: string | null, secret: string | null): Promise<boolean> {
  if (!token || !secret) return false;
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token }),
  });
  const verdict = (await response.json()) as Verdict;
  // reCAPTCHA v3 scores a visitor from 0 (a bot) to 1 (a person), and Google suggests 0.5 as the line.
  return verdict.success && (verdict.score ?? 0) >= 0.5;
}
