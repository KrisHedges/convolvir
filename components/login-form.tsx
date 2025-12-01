"use client";

import { createBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    }
  };

  return (
    <div {...props}>
      <div>
        <div>
          <h2>Login</h2>
          <p>
            Enter your email below to login to your account
          </p>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Link
                    href="/auth/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p>{error}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
              >
                Sign up
              </Link>
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              title="Sign In with Google"
            >
              Sign In with Google/Gmail
            </button>
            <button
              type="button"
              onClick={handleGitHubLogin}
              title="Sign In with GitHub"
            >
              Sign In with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
