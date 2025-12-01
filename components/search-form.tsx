"use client";

import { useSearchParams } from "next/navigation";
import styles from "./search-form.module.css";

export function SearchForm() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <form className={styles.form}>
      <input
        type="search"
        name="q"
        defaultValue={query || ""}
        placeholder="Search by name or type..."
      />
    </form>
  );
}
