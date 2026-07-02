export const PASSWORD_MIN = 8;

export function validateFullname(v: string): string | undefined {
  if (!v.trim()) return "Full name is required.";
  if (v.trim().length < 2) return "Name must be at least 2 characters.";
}

export function validateEmail(v: string): string | undefined {
  if (!v.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Enter a valid email address.";
}

export function validatePassword(v: string): string | undefined {
  if (!v) return "Password is required.";
  if (v.length < PASSWORD_MIN)
    return `Password must be at least ${PASSWORD_MIN} characters.`;
  if (!/[A-Z]/.test(v))
    return "Password must contain at least one uppercase letter.";
  if (!/[0-9]/.test(v)) return "Password must contain at least one number.";
}

export function validateConfirmPassword(
  v: string,
  password: string
): string | undefined {
  if (!v) return "Please confirm your password.";
  if (v !== password) return "Passwords do not match.";
}

export function validateAgreed(v: boolean): string | undefined {
  if (!v) return "You must agree to the Terms of Service and Privacy Policy.";
}
