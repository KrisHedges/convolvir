import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";

async function getSignedUrl(supabase: any, path: string) {
  let correctedPath = path.replace(/^impulse-responses\//, "");
  correctedPath = correctedPath.replace(/^\//, ""); // Remove leading slash
  const { data, error } = await supabase.storage
    .from("impulse-responses")
    .createSignedUrl(correctedPath, 3600);

  if (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }

  return data.signedUrl;
}

export const getImpulseResponses = cache(async (page = 1, pageSize = 10) => {
  const supabase = await createServerClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let { data, error, count } = await supabase
    .from("impulse_responses")
    .select("*", { count: "exact" })
    .range(start, end);

  if (error) {
    console.error("Error fetching impulse responses:", error);
    return { data: [], count: 0 };
  }

  if (data) {
    data = await Promise.all(
      data.map(async (ir: any) => {
        if (ir.wav_file_url) {
          ir.wav_file_url = await getSignedUrl(supabase, ir.wav_file_url);
        }
        return ir;
      }),
    );
  }

  return { data, count };
});

export const searchImpulseResponses = cache(
  async (query: string, page = 1, pageSize = 10) => {
    const supabase = await createServerClient();
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    let { data, error, count } = await supabase
      .from("impulse_responses")
      .select("*", { count: "exact" })
      .or(`name.ilike.%${query}%,type.ilike.%${query}%`)
      .range(start, end);

    if (error) {
      console.error("Error searching impulse responses:", error);
      return { data: [], count: 0 };
    }

    if (data) {
      data = await Promise.all(
        data.map(async (ir: any) => {
          if (ir.wav_file_url) {
            ir.wav_file_url = await getSignedUrl(supabase, ir.wav_file_url);
          }
          return ir;
        }),
      );
    }

    return { data, count };
  },
);
