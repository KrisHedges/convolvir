import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <pre>
      <Suspense>
        <UserDetails />
      </Suspense>
    </pre>
  );
}
