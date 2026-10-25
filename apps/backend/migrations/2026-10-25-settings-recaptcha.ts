import { defineMigration } from 'ohnejs';

// A site made before the contact form already holds its Settings row, and the new switch starts off there.
export default defineMigration({
  from: null,
  to: { collection: 'Settings', field: 'recaptcha' },
  transform: () => false,
});
