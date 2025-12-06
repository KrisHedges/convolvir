"use client";
import { ConvolverPlayer } from "@convolver-player/react";
import { Activity, useState } from "react";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Download1Outlined } from "@lineiconshq/free-icons";
export function Player({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  const togglePlayer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Activity mode={!open ? "visible" : "hidden"}>
        <>
          <button onClick={() => togglePlayer()} className="hidden-player-button"></button>
          <button onClick={() => togglePlayer()}>Preview</button>
        </>
      </Activity>
      <Activity mode={open ? "visible" : "hidden"}>
        <div className="convolver-player-container">
          <button onClick={() => togglePlayer()}>Close</button>
          <ConvolverPlayer irFilePath={src} />
          <a className="button convolver-player-download" href={src} title="Download IR file"><Lineicons icon={Download1Outlined}></Lineicons>Download IR (.wav file)</a>
        </div>
      </Activity>
    </>
  );
}
