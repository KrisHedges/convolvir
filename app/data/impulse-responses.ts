import { ImpulseResponse } from "@/types/impulse-response";
import { createServerClient } from "@/lib/supabase/server";
import { cache } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

export const getSignedUrl = async (supabase: SupabaseClient, path: string) => {
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

export const getImpulseResponses = cache(async (page = 1, pageSize = 12) => {
  const supabase = await createServerClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const response = await supabase
    .from("impulse_responses")
    .select("*", { count: "exact" })
    .range(start, end);
  
  let { data } = response;
  const { error, count } = response;

  if (error) {
    console.error("Error fetching impulse responses:", error);
    return { data: [], count: 0 };
  }

  if (data) {
    data = await Promise.all(
      data.map(async (ir: ImpulseResponse) => {
        if (ir.wav_file_url) {
          ir.wav_file_url = await getSignedUrl(supabase, ir.wav_file_url);
        }
        if (typeof ir.amplitude_envelope === "string") {
          try {
            ir.amplitude_envelope = JSON.parse(ir.amplitude_envelope);
          } catch (e) {
            console.error("Error parsing amplitude_envelope:", e);
            ir.amplitude_envelope = [];
          }
        }
        // Handle frequency_bands_db
        if (typeof ir.frequency_bands_db === "string") {
          try {
            const parsed = JSON.parse(ir.frequency_bands_db);
            if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
              ir.frequency_bands_db = parsed;
            } else {
              ir.frequency_bands_db = {};
            }
          } catch (e) {
            console.error("Error parsing frequency_bands_db:", e);
            ir.frequency_bands_db = {};
          }
        } else if (
          typeof ir.frequency_bands_db === "object" &&
          ir.frequency_bands_db !== null &&
          !Array.isArray(ir.frequency_bands_db)
        ) {
          // It's already an object, keep it
        } else {
          ir.frequency_bands_db = {};
        }
        return ir;
      }),
    );
  }

  return { data: data as ImpulseResponse[], count };
});

export const searchImpulseResponses = cache(
  async (query: string, page = 1, pageSize = 12) => {
    const supabase = await createServerClient();
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const response = await supabase
      .from("impulse_responses")
      .select("*", { count: "exact" })
      .or(`name.ilike.%${query}%,type.ilike.%${query}%`)
      .range(start, end);

    let { data } = response;
    const { error, count } = response;

    if (error) {
      console.error("Error searching impulse responses:", error);
      return { data: [], count: 0 };
    }

    if (data) {
      data = await Promise.all(
        data.map(async (ir: ImpulseResponse) => {
          if (ir.wav_file_url) {
            ir.wav_file_url = await getSignedUrl(supabase, ir.wav_file_url);
          }
          if (typeof ir.amplitude_envelope === "string") {
            try {
              ir.amplitude_envelope = JSON.parse(ir.amplitude_envelope);
            } catch (e) {
              console.error("Error parsing amplitude_envelope:", e);
              ir.amplitude_envelope = [];
            }
          }
          // Handle frequency_bands_db
          if (typeof ir.frequency_bands_db === "string") {
            try {
              const parsed = JSON.parse(ir.frequency_bands_db);
              if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
                ir.frequency_bands_db = parsed;
              } else {
                ir.frequency_bands_db = {};
              }
            } catch (e) {
              console.error("Error parsing frequency_bands_db:", e);
              ir.frequency_bands_db = {};
            }
          } else if (
            typeof ir.frequency_bands_db === "object" &&
            ir.frequency_bands_db !== null &&
            !Array.isArray(ir.frequency_bands_db)
          ) {
            // It's already an object, keep it
          } else {
            ir.frequency_bands_db = {};
          }
          return ir;
        }),
      );
    }

    return { data: data as ImpulseResponse[], count };
  },
);
