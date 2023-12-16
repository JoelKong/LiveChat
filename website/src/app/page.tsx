"use client";

import Landing from "@/components/Landing";
import Chat from "@/components/Chat";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFirePreset } from "tsparticles-preset-fire";
import { useState, useEffect } from "react";

export default function Home() {
  const [chatActive, setChatActive] = useState<boolean>(false);

  const options = {
    preset: "fire",
  };

  async function loadFire(engine: Engine) {
    await loadFirePreset(engine);
  }

  return (
    <>
      <Particles options={options} init={loadFire} />
      <section className="relative w-screen h-screen">
        <Landing setChatActive={setChatActive} />
        {chatActive && <Chat />}
      </section>
    </>
  );
}
