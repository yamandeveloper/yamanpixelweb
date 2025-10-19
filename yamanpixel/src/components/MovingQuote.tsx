"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MovingQuote() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const text = wrapper.querySelector(".moving-text") as HTMLElement;
    if (!text) return;

    // ikinci bir kopya oluştur (sonsuz döngü için)
    const clone = text.cloneNode(true) as HTMLElement;
    wrapper.appendChild(clone);

    // GSAP animasyonu
    gsap.to(wrapper.children, {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "linear",
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });
  }, []);

  return (
    <section
      className="
        relative
        flex items-center overflow-hidden
        bg-neutral-950
        border-y border-neutral-800
        h-[12vh] sm:h-[18vh] md:h-[22vh]
        m-0 p-0
      "
    >
      <div
        ref={wrapperRef}
        className="
          flex whitespace-nowrap
          text-[8vw] sm:text-[6vw] md:text-[4.5vw]
          font-extrabold uppercase text-white/90 tracking-tight
          leading-none
        "
      >
        <span className="moving-text px-8">
          I don’t just make films — I build worlds of light and silence.
        </span>
      </div>
    </section>
  );
}
