import { useId } from 'react';

/**
 * Props for `TextInput`.
 */
export interface TextInputProps {
  /**
   * The text above the field.
   */
  label: string;

  /**
   * The field's name in the form's data.
   */
  name: string;

  /**
   * A one-line text or email field, or a text area.
   *
   * @default
   * 'text'
   */
  type?: 'text' | 'email' | 'textarea';

  /**
   * What the browser may fill in, like `name` or `email`.
   */
  autoComplete?: string;

  /**
   * The CMS's message for an invalid value.
   */
  error?: string;
}

export function TextInput({ label, name, type = 'text', autoComplete, error }: TextInputProps) {
  // `useId` gives the same id on the server and in the browser, so the label finds its input after hydration.
  const id = useId();
  const field = {
    id,
    name,
    className:
      type === 'textarea' ? 'text-input__field text-input__field--area' : 'text-input__field',
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  };
  return (
    <div className="text-input">
      <label htmlFor={id} className="text-input__label">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea rows={12} {...field} />
      ) : (
        <input type={type} autoComplete={autoComplete} spellCheck={false} {...field} />
      )}
      {error && (
        <p id={`${id}-error`} className="text-input__error">
          {/* ohne wraps the values in its messages in backticks, and the form shows them as code. */}
          {error
            .split('`')
            .map((part, index) => (index % 2 ? <code key={index}>{part}</code> : part))}
        </p>
      )}
    </div>
  );
}
