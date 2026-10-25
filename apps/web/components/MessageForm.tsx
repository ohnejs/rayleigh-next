'use client';

import type { Refused } from '@ohnejs/client';

import Script from 'next/script';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import { sendMessage } from '../lib/contact';
import { recaptchaScript, recaptchaToken } from '../lib/recaptcha';
import { Button } from './Button';
import { TextInput } from './TextInput';

/**
 * Props for `MessageForm`.
 */
export interface MessageFormProps {
  /**
   * reCAPTCHA's site key while the spam check is on in `Settings`, or `null` while it is off.
   */
  siteKey: string | null;
}

// The form runs in the browser, and `sendMessage` hands each message to the CMS on the server.
export function MessageForm({ siteKey }: MessageFormProps) {
  const form = useRef<HTMLFormElement>(null);
  const thanks = useRef<HTMLParagraphElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [refusal, setRefusal] = useState<Partial<Refused>>();
  const errors = refusal?.errors ?? {};

  useEffect(() => {
    if (sent) thanks.current?.focus();
    // Focus moves to the first field to fix, so a keyboard or screen reader visitor lands on it.
    else form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [sent, refusal]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? '');
    setSending(true);
    try {
      const recaptcha = siteKey ? await recaptchaToken(siteKey) : undefined;
      const message = { name: text('name'), email: text('email'), message: text('message') };
      const result = await sendMessage(message, recaptcha);
      if (result.ok) setSent(true);
      else setRefusal(result);
    } catch {
      setRefusal({});
    }
    setSending(false);
  }

  if (sent)
    return (
      <p ref={thanks} className="contact-form__note" tabIndex={-1}>
        Thank you for your message! We'll get back to you as soon as possible.
      </p>
    );

  const failure =
    refusal && Object.keys(errors).length === 0
      ? refusal.message || 'Something went wrong. Please try again.'
      : undefined;
  return (
    // `noValidate` leaves every check to the CMS, so the form shows the CMS's own messages.
    <form ref={form} className="contact-form" noValidate onSubmit={send}>
      {/* The spam check is a switch in `Settings`, so reCAPTCHA's script loads only while it is on. */}
      {siteKey && <Script src={recaptchaScript(siteKey)} />}
      {/* While the message is sent, a disabled `<fieldset>` disables every field and the button. */}
      <fieldset className="contact-form__fields" disabled={sending}>
        {failure && (
          <p className="contact-form__note contact-form__note--error" role="alert">
            {failure}
          </p>
        )}
        <TextInput label="Your name" name="name" autoComplete="name" error={errors.name} />
        <TextInput
          label="Your email address"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
        />
        <TextInput label="Message" name="message" type="textarea" error={errors.message} />
        <Button type="submit">Send</Button>
      </fieldset>
    </form>
  );
}
