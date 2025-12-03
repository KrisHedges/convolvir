"use client";

import { createBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { PowerButtonOutlined } from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createBrowserClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button className="circle-button" onClick={signOut}>
      <Lineicons icon={PowerButtonOutlined} />
    </button>
  );
}
