"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

import { Button } from "@/components/Atoms/button";
import { AuthInputField } from "@/components/Atoms/auth/auth-input-field";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { AuthFormHeader } from "@/components/Molecules/auth/auth-form-header";
import { AuthPasswordStrength } from "@/components/Molecules/auth/auth-password-strength";
import { AuthSecurityNote } from "@/components/Molecules/auth/auth-security-note";
import {
  validatePassword,
  validateConfirmPassword,
} from "@/lib/auth-validation";

interface FormFields {
  password: string;
  confirm: string;
}

interface FormErrors {
  password?: string;
  confirm?: string;
}

type ResetPasswordFormProps = {
  /** Called with the new password when the form is valid and submitted. */
  onSubmit: (password: string) => Promise<void>;
};

/**
 * Molecule: new-password form used on the reset-password page.
 * Owns all field state, validation, and show/hide toggles.
 * Delegates the actual API call to the parent via `onSubmit`.
 */
export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fields, setFields] = useState<FormFields>({ password: "", confirm: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (!touched[name]) return;

    let err: string | undefined;
    if (name === "password") {
      err = validatePassword(value);
      // re-validate confirm if already touched
      if (touched.confirm)
        setErrors((prev) => ({
          ...prev,
          confirm: validateConfirmPassword(fields.confirm, value),
        }));
    } else {
      err = validateConfirmPassword(value, fields.password);
    }
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err =
      name === "password"
        ? validatePassword(value)
        : validateConfirmPassword(value, fields.password);
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: FormErrors = {
      password: validatePassword(fields.password),
      confirm: validateConfirmPassword(fields.confirm, fields.password),
    };
    setErrors(next);
    setTouched({ password: true, confirm: true });
    if (next.password || next.confirm) return;

    setIsSubmitting(true);
    try {
      await onSubmit(fields.password);
    } finally {
      setIsSubmitting(false);
    }
  }

  /** Eye-toggle button reused for both fields */
  function EyeButton({
    visible,
    onToggle,
  }: {
    visible: boolean;
    onToggle: () => void;
  }) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-auto w-auto p-0 text-muted-foreground hover:text-foreground hover:bg-transparent"
        onClick={onToggle}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthFormHeader
        title="Set new password"
        subtitle="Choose a strong password for your account."
      />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        {/* New password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            New password
          </label>
          <AuthInputField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={fields.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Create a new password"
            autoComplete="new-password"
            error={errors.password}
            errorId="password-error"
            leftIcon={<LockIcon className="h-4 w-4" />}
            rightElement={
              <EyeButton
                visible={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            }
          />
          <AuthPasswordStrength password={fields.password} />
          {errors.password ? (
            <AuthErrorMessage id="password-error" message={errors.password} />
          ) : (
            <p className="text-xs text-muted-foreground">
              Min. 8 characters, one uppercase letter, one number.
            </p>
          )}
        </div>

        {/* Confirm password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirm" className="text-sm font-medium text-foreground">
            Confirm password
          </label>
          <AuthInputField
            id="confirm"
            name="confirm"
            type={showConfirm ? "text" : "password"}
            value={fields.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm your new password"
            autoComplete="new-password"
            error={errors.confirm}
            errorId="confirm-error"
            leftIcon={<LockIcon className="h-4 w-4" />}
            rightElement={
              <EyeButton
                visible={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
              />
            }
          />
          <AuthErrorMessage id="confirm-error" message={errors.confirm} />
        </div>

        <Button
          type="submit"
          className="h-11 w-full text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Updating…
            </span>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>

      <AuthSecurityNote />
    </div>
  );
}
