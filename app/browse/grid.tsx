import {
  getImpulseResponses,
  searchImpulseResponses,
} from "@/app/data/impulse-responses";
import { Player } from "@/components/player";
import Link from "next/link";

export async function ImpulseResponsesGrid({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q: query, page: pageStr } = await searchParams;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const pageSize = 10;

  const { data: impulseResponses, count } = query
    ? await searchImpulseResponses(query, page, pageSize)
    : await getImpulseResponses(page, pageSize);

  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impulseResponses &&
          impulseResponses.map((ir: any) => (
            <div key={ir.id} className="border p-4 rounded">
              <h2 className="font-bold">{ir.name}</h2>
              <p>{ir.type}</p>
              {ir.wav_file_url && <Player src={ir.wav_file_url} />}
            </div>
          ))}
      </div>

      <div className="flex justify-between mt-4">
        {page > 1 && (
          <Link href={`/browse?q=${query || ""}&page=${page - 1}`}>
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/browse?q=${query || ""}&page=${page + 1}`}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
