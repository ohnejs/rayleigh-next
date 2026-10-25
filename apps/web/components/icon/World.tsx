import type { SVGProps } from 'react';

export function IconWorld(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12" {...props}>
      <path
        d="M10.5 6C10.5 8.48528 8.48528 10.5 6 10.5C3.51472 10.5 1.5 8.48528 1.5 6C1.5 3.51472 3.51472 1.5 6 1.5C8.48528 1.5 10.5 3.51472 10.5 6Z"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M1.75 4.5H10.25M1.75 7.5H10.25M6 1.5C4.75 2.75 4.125 4.25 4.125 6C4.125 7.75 4.75 9.25 6 10.5C7.25 9.25 7.875 7.75 7.875 6C7.875 4.25 7.25 2.75 6 1.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.75"
      />
    </svg>
  );
}
