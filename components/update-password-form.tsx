"use client";

import { createBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createBrowserClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div {...props}>
      <div>
        <div>
          <h2>Reset Your Password</h2>
          <p>
            Please enter your new password below.
          </p>
        </div>
        <div>
          <form onSubmit={handleForgotPassword}>
            <div>
              <div>
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p>{error}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save new password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
