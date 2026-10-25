import type { Upload } from '../ohne';

// The logo is an upload in `Settings`, so an editor can replace it in the dashboard.
export function Logo({ logo }: { logo: Upload | null }) {
  if (!logo) return null;
  return (
    <img
      className="logo"
      src={logo.url}
      width={logo.width ?? undefined}
      height={logo.height ?? undefined}
      alt={logo.description ?? 'Rayleigh'}
      decoding="async"
    />
  );
}
