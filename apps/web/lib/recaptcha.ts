/**
 * The part of Google's reCAPTCHA v3 script the contact form uses.
 * See https://developers.google.com/recaptcha/docs/v3
 */
interface ReCaptcha {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: ReCaptcha;
  }
}

/**
 * The address of reCAPTCHA's script for `siteKey`.
 * The script watches how the visitor uses the page, so it loads with the page, not on submit.
 */
export function recaptchaScript(siteKey: string): string {
  return `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
}

/**
 * Asks reCAPTCHA for a fresh token, which the backend hands to Google to score the visitor.
 * A token expires after two minutes, so the form asks for one on each submit.
 */
export async function recaptchaToken(siteKey: string): Promise<string> {
  const { grecaptcha } = window;
  if (!grecaptcha) throw new Error('reCAPTCHA did not load');
  await new Promise<void>((resolve) => grecaptcha.ready(resolve));
  return grecaptcha.execute(siteKey, { action: 'contact' });
}
