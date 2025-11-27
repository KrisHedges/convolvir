import { Suspense } from "react";
import { ImpulseResponsesGrid } from "./grid";
import { SearchForm } from "@/components/search-form";

export default function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Impulse Responses</h1>
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchForm />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ImpulseResponsesGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

