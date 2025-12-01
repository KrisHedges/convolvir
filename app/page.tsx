import { Suspense } from "react";
import { ImpulseResponsesGrid } from "@/components/grid";
import { SearchForm } from "@/components/search-form";

export default function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  return (
    <>
      <header>
        <h1>ConvolvIR</h1>
      </header>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ImpulseResponsesGrid searchParams={searchParams} />
      </Suspense>
    </>
  );
}

