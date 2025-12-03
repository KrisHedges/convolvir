"use client";

import { createBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createBrowserClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form" {...props}>
      {success ? (
        <>
          <h2>Check Your Email</h2>
          <p>Password reset instructions sent</p>
          <p>
            If you registered using your email and password, you will receive
            a password reset email.
          </p>
        </>
      ) : (
        <form onSubmit={handleForgotPassword}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset email"}
          </button>
          Already have an account?{" "}
          <Link
            href="/auth/login"
          >
            Login
          </Link>
        </form>
      )}
    </div>
  );
}
