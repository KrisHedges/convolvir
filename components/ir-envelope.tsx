"use client";

import { useMemo } from "react";

export function IREnvelope({ data }: { data: number[] }) {
    const pathData = useMemo(() => {
        if (!data || !Array.isArray(data) || data.length === 0) return "";

        const width = 100;
        const height = 60;
        const step = width / (data.length - 1);

        // Find max value to normalize if needed, but assuming data is already somewhat normalized or we just scale it.
        // If data is raw amplitude, it might be small. Let's assume it's 0-1 for now.
        // Actually, let's just scale to fit height.
        const max = Math.max(...data);
        const scale = max > 0 ? height / max : 1;

        const points = data.map((val, i) => {
            const x = i * step;
            const y = height - val * scale;
            return `${x},${y}`;
        });

        return `M0,${height} L${points.join(" L")} L${width},${height} Z`;
    }, [data]);

    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <svg
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            height="60"
            width="100%"
        >
            <path d={pathData} />
        </svg>
    );
}
