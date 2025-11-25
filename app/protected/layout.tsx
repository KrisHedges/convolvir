import AuthButton from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <nav>
        <Link href={"/"}>Home</Link>
        <ThemeSwitcher />
        <Suspense>
          <AuthButton />
        </Suspense>
      </nav>
      {children}
    </main>
  );
}
