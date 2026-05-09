'use client';

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
  fullScreen: false,
  background: {
    color: "transparent",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#00d4ff", "#7c3aed", "#e8e8ed"],
    },
    links: {
      enable: true,
      color: "#00d4ff",
      distance: 150,
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.45,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "bounce",
      },
    },
    opacity: {
      value: {
        min: 0.14,
        max: 0.34,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
  },
  detectRetina: true,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.5,
        },
      },
      push: {
        quantity: 3,
      },
    },
  },
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: {
            value: 32,
          },
          links: {
            distance: 110,
          },
        },
      },
    },
  ],
};

export function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10 opacity-80"
      options={options}
    />
  );
}
