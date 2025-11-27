"use client";
import { ConvolverPlayer } from "@convolver-player/react";

export function Player({ src }: { src: string }) {
  return <ConvolverPlayer irFilePath={src} />;
}
