import Image from "next/image";
import { Typewriter, FadeIn } from "./typewriter";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="flex flex-col items-center gap-6 px-6 text-center">
        <FadeIn delay={200} duration={800} className="flex items-center gap-3">
          <Image
            src="/logo_white.svg"
            alt="Nixopus logo"
            width={40}
            height={40}
          />
          <span className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500">
            Nixopus
          </span>
        </FadeIn>

        <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
          <Typewriter text="Hello World" speed={100} delay={1000} />
        </h1>

        <FadeIn delay={2200} duration={600} className="flex items-center gap-6 mt-2">
          <a
            href="https://docs.nixopus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/nixopus/nixopus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </FadeIn>

        <FadeIn delay={2400} duration={600}>
          <div className="mt-4 h-px w-16 bg-zinc-800" />
        </FadeIn>

        <FadeIn delay={2600} duration={600}>
          <p className="text-sm text-zinc-600 font-mono">
            sample-app
          </p>
        </FadeIn>
      </main>
    </div>
  );
}
