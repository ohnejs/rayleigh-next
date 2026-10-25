// One fixed locale and time zone give the same text on the server and in the browser, so hydration matches.
const format = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

/**
 * Props for `WrittenOn`.
 */
export interface WrittenOnProps {
  /**
   * When the post went live, as a Unix timestamp in milliseconds, like its `publishedAt`.
   */
  date: number | null;

  /**
   * The post's author.
   */
  author: { name: string } | null;
}

export function WrittenOn({ date, author }: WrittenOnProps) {
  if (date === null) return null;
  return (
    <p className="written-on">
      Written on{' '}
      <time dateTime={new Date(date).toISOString().slice(0, 10)}>{format.format(date)}</time>
      {author && ` by ${author.name}`}
    </p>
  );
}
