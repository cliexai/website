const raw = import.meta.env.VITE_ADMIN_EMAILS as string | undefined;
const ADMIN_EMAILS: string[] = raw
  ? raw.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
  : [];

export const isAdminEmail = (email?: string | null): boolean =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());
