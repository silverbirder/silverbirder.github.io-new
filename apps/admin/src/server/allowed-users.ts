export const parseAllowedEmails = (rawValue?: string) =>
  (rawValue ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

export const isAllowedEmail = (
  email: string | null | undefined,
  allowedEmails: string[],
) => {
  if (!email) return false;
  return allowedEmails.includes(email.toLowerCase());
};
