"use client";

import { useTheme } from "next-themes";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Sun1Outlined, MoonHalfRight5Outlined } from "@lineiconshq/free-icons";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className="circle-button" onClick={toggleTheme} aria-label="Toggle Theme">
      {mounted && theme === "light" ? (
        <Lineicons icon={MoonHalfRight5Outlined} />
      ) : (
        <Lineicons icon={Sun1Outlined} />
      )}
    </button>
  );
};

export { ThemeSwitcher };
