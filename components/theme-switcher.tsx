"use client";

import { useTheme } from "next-themes";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Sun1Outlined, MoonHalfRight5Outlined } from "@lineiconshq/free-icons";
import styles from "./theme-switcher.module.css";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className={`${styles.themeSwitcher}`} onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === "light" ? <Lineicons icon={MoonHalfRight5Outlined} /> : <Lineicons icon={Sun1Outlined} />}
    </button>
  );
};

export { ThemeSwitcher };
