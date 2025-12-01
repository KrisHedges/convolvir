"use client";
import { ConvolverPlayer } from "@convolver-player/react";
import { useState } from "react";

export function Player({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  const togglePlayer = () => {
    setOpen(!open);
  };

  return (
    <>
      {!open && (<button onClick={() => togglePlayer()}>Preview</button>)}
      {open && (
        <div className="convolver-player-container">
          <button onClick={() => togglePlayer()}>Close</button>
          <ConvolverPlayer irFilePath={src} />
        </div>
      )}
    </>
  );
}
