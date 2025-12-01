import {
  getImpulseResponses,
  searchImpulseResponses,
} from "@/app/data/impulse-responses";
import { ImpulseResponse } from "@/types/impulse-response";
import { Player } from "@/components/player";
import Link from "next/link";
import Paginator from "./paginator";
import { IREnvelope } from "./ir-envelope";
import { IRSpectrum } from "./ir-spectrum";
export async function ImpulseResponsesGrid({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q: query, page: pageStr } = await searchParams;
  const page = pageStr ? parseInt(pageStr, 12) : 1;
  const pageSize = 12;

  const { data: impulseResponses, count } = query
    ? await searchImpulseResponses(query, page, pageSize)
    : await getImpulseResponses(page, pageSize);

  const totalPages = Math.ceil((count || 0) / pageSize);

  return (
    <div>
      <Paginator query={query || ""} page={page} totalPages={totalPages} />
      <div className="ir-grid">
        {impulseResponses &&
          impulseResponses.map((ir: ImpulseResponse) => (
            <div key={ir.id} className="ir-card">
              <div className="ir-card-header">
                <div className="ir-card-title-group">
                  <h2 className="ir-card-title">{ir.name}</h2>
                  <span className="ir-tag ir-tag-primary">{ir.type}</span>
                </div>
                {ir.wav_file_url && <Player src={ir.wav_file_url} />}
              </div>

              <div className="ir-card-body">
                <div className="ir-tags">
                  {ir.duration_category && (
                    <span className="ir-tag" title="Duration">
                      ⏱ {ir.duration_category}
                    </span>
                  )}
                  {ir.brightness_category && (
                    <span className="ir-tag" title="Brightness">
                      ☀ {ir.brightness_category}
                    </span>
                  )}
                  {ir.texture_category && (
                    <span className="ir-tag" title="Texture">
                      〰 {ir.texture_category}
                    </span>
                  )}
                </div>

                {(ir.source_manufacturer || ir.source_model || ir.source_type
                  || ir.source_location || ir.source_architecture
                ) && (
                    <div className="ir-meta">
                      <span className="ir-meta-label">Source:</span>{" "}
                      {ir.source_manufacturer} {ir.source_model} {ir.source_type} {ir.source_location} {ir.source_architecture}
                    </div>
                  )}

                {ir.space_size && (
                  <div className="ir-meta">
                    <span className="ir-meta-label">Size:</span> {ir.space_size}
                  </div>
                )}
              </div>
              <div className="ir-envelope">
                <div className="ir-envelope-title">Amplitude Envelope (Approx.)</div>
                {ir.amplitude_envelope && (
                  <IREnvelope data={ir.amplitude_envelope} />
                )}
              </div>
              <div className="ir-spectrum-container">
                <div className="ir-spectrum-title">Frequency Bands (dB)</div>
                {ir.frequency_bands_db && (
                  <IRSpectrum data={ir.frequency_bands_db} />
                )}
              </div>
            </div>
          ))}
      </div>
      <Paginator query={query || ""} page={page} totalPages={totalPages} />
    </div>
  );
}
