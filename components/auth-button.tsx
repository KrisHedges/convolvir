import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

export default async function AuthButton() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <>
      <LogoutButton />
    </>
  ) : (
    <>
      <Link href="/auth/login">Sign in</Link>
    </>
  );
}
