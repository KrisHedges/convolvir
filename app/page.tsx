import AuthButton from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";
import { Player } from "@/components/player";
export default function Home() {
  return (
    <main>
      <nav>
        <Link href={"/"}>Home</Link>
        <ThemeSwitcher />
        <Suspense>
          <AuthButton />
        </Suspense>
      </nav>
      <Player />
    </main>
  );
}
