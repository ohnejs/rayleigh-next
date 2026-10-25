import { defineBlock } from 'ohnejs';

// A block without fields: your website renders the form, and it sends each message to `Messages`.
export default defineBlock({
  description: 'A form that sends a message to the Messages collection',
  fields: {},
  dashboard: { icon: 'forms' },
});
