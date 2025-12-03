"use client";

import { useMemo, CSSProperties } from "react";

export function IRSpectrum({ data }: { data: Record<string, number> }) {
    const bars = useMemo(() => {
        if (!data || Object.keys(data).length === 0) return [];

        const entries = Object.entries(data);
        const values = entries.map(([_, val]) => val);

        // Find min and max to auto-scale
        let min = Math.min(...values);
        let max = Math.max(...values);

        // Avoid division by zero if flat line
        if (min === max) {
            min = min - 10; // Arbitrary range
            max = max + 10;
        }

        const range = max - min;

        return entries.map(([label, val]) => {
            // Normalize 0-1
            const normalized = (val - min) / range;
            // Height in percent
            return {
                height: normalized * 100,
                label,
                value: val
            };
        });
    }, [data]);

    if (!data || Object.keys(data).length === 0) return null;

    return (
        <div className="ir-spectrum">
            {bars.map((item, i) => (
                <div key={i} className="ir-spectrum-item">
                    <div
                        className="ir-spectrum-bar"
                        style={{ "--bar-height": `${item.height}%` } as CSSProperties}
                        title={`${item.label}: ${item.value.toFixed(1)} dB`}
                    />
                    <span className="ir-spectrum-label">{item.label.replaceAll("000hz", "kHz").replaceAll("000", "k")}</span>
                </div>
            ))}
        </div>
    );
}
