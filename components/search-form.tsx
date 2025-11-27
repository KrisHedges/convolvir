"use client";

import { useSearchParams } from "next/navigation";

export function SearchForm() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <form className="mb-4">
      <input
        type="search"
        name="q"
        defaultValue={query || ""}
        placeholder="Search by name or type..."
        className="border p-2 w-full"
      />
    </form>
  );
}
