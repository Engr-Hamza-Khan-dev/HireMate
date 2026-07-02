"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/Atoms/button";
import { SettingsSectionHeader } from "@/components/Atoms/settings/settings-section-header";
import { AuthInputField } from "@/components/Atoms/auth/auth-input-field";
import { AuthErrorMessage } from "@/components/Atoms/auth/auth-error-message";
import { AuthPasswordStrength } from "@/components/Molecules/auth/auth-password-strength";
import {
  validatePassword,
  validateConfirmPassword,
} from "@/lib/auth-validation";

interface PasswordFields {
  current: string;
  next: string;
  confirm: string;
}

interface PasswordErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

/**
 * Molecule: Password change form with strength indicator and validation.
 */
export function PasswordSection() {
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [fields, setFields] = useState<PasswordFields>({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function toggle(key: keyof typeof show) {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleChange(field: keyof PasswordFields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFields((prev) => ({ ...prev, [field]: value }));
      if (!touched[field]) return;
      let err: string | undefined;
      if (field === "current") err = value ? undefined : "Current password is required.";
      else if (field === "next") {
        err = validatePassword(value);
        if (touched.confirm)
          setErrors((prev) => ({ ...prev, confirm: validateConfirmPassword(fields.confirm, value) }));
      } else if (field === "confirm") err = validateConfirmPassword(value, fields.next);
      setErrors((prev) => ({ ...prev, [field]: err }));
    };
  }

  function handleBlur(field: keyof PasswordFields) {
    return () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      let err: string | undefined;
      if (field === "current") err = fields.current ? undefined : "Current password is required.";
      else if (field === "next") err = validatePassword(fields.next);
      else if (field === "confirm") err = validateConfirmPassword(fields.confirm, fields.next);
      setErrors((prev) => ({ ...prev, [field]: err }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: PasswordErrors = {
      current: fields.current ? undefined : "Current password is required.",
      next: validatePassword(fields.next),
      confirm: validateConfirmPassword(fields.confirm, fields.next),
    };
    setErrors(next);
    setTouched({ current: true, next: true, confirm: true });
    if (Object.values(next).some(Boolean)) return;
    console.log("Password update submitted");
  }

  const eyeBtn = (key: keyof typeof show) => (
    <button
      type="button"
      onClick={() => toggle(key)}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={show[key] ? "Hide password" : "Show password"}
    >
      {show[key] ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
    </button>
  );

  return (
    <Card>
      <CardHeader>
        <SettingsSectionHeader
          title="Change Password"
          description="Keep your account secure with a strong password."
        />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-md">
          {/* Current password */}
          <div className="space-y-1.5">
            <label htmlFor="current-pw" className="text-sm font-medium text-foreground">
              Current password
            </label>
            <AuthInputField
              id="current-pw"
              name="current"
              type={show.current ? "text" : "password"}
              value={fields.current}
              onChange={handleChange("current")}
              onBlur={handleBlur("current")}
              placeholder="Enter current password"
              autoComplete="current-password"
              error={errors.current}
              errorId="current-pw-error"
              leftIcon={<LockIcon className="h-4 w-4" />}
              rightElement={eyeBtn("current")}
            />
            <AuthErrorMessage id="current-pw-error" message={errors.current} />
          </div>

          {/* New password */}
          <div className="space-y-1.5">
            <label htmlFor="new-pw" className="text-sm font-medium text-foreground">
              New password
            </label>
            <AuthInputField
              id="new-pw"
              name="next"
              type={show.next ? "text" : "password"}
              value={fields.next}
              onChange={handleChange("next")}
              onBlur={handleBlur("next")}
              placeholder="Create new password"
              autoComplete="new-password"
              error={errors.next}
              errorId="new-pw-error"
              leftIcon={<LockIcon className="h-4 w-4" />}
              rightElement={eyeBtn("next")}
            />
            <AuthPasswordStrength password={fields.next} />
            {errors.next
              ? <AuthErrorMessage id="new-pw-error" message={errors.next} />
              : <p className="text-xs text-muted-foreground">Min. 8 characters, one uppercase, one number.</p>
            }
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label htmlFor="confirm-pw" className="text-sm font-medium text-foreground">
              Confirm new password
            </label>
            <AuthInputField
              id="confirm-pw"
              name="confirm"
              type={show.confirm ? "text" : "password"}
              value={fields.confirm}
              onChange={handleChange("confirm")}
              onBlur={handleBlur("confirm")}
              placeholder="Confirm new password"
              autoComplete="new-password"
              error={errors.confirm}
              errorId="confirm-pw-error"
              leftIcon={<LockIcon className="h-4 w-4" />}
              rightElement={eyeBtn("confirm")}
            />
            <AuthErrorMessage id="confirm-pw-error" message={errors.confirm} />
          </div>

          <div className="flex justify-end pt-1">
            <Button type="submit" className="px-6">Update password</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
