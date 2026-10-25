import { ohne } from '../../lib/ohne';
import { Container } from '../Container';
import { MessageForm } from '../MessageForm';

// The block has no fields to edit: it renders the form, and each message lands in `Messages`.
// It renders on the server, so it reads the spam check from `Settings` and hands the form its key.
export async function ContactForm() {
  const { recaptcha, recaptchaSiteKey } = await ohne.read('Settings', {
    select: ['recaptcha', 'recaptchaSiteKey'],
  });
  return (
    <Container className="content-block">
      <MessageForm siteKey={recaptcha ? recaptchaSiteKey : null} />
    </Container>
  );
}
