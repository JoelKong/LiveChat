"use client";

import Landing from "@/components/Landing";
import Chat from "@/components/Chat";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFirePreset } from "tsparticles-preset-fire";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
      <Link
        className="fixed z-40 w-36 md:w-48 h-12 bottom-4 right-4 rounded-lg bg-gray-600 text-white hover:bg-gray-700 hover:scale-110 transition-all ease-in-out text-md flex flex-row justify-center items-center shadow-lg"
        href="https://github.com/JoelKong/LiveChat"
        target="_blank"
      >
        <Image
          className="mr-2"
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="github"
          width={27}
          height={27}
        />
        View Code
      </Link>
      <section className="relative w-screen h-screen">
        <Landing setChatActive={setChatActive} />
        {chatActive && <Chat />}
      </section>
    </>
  );
}
