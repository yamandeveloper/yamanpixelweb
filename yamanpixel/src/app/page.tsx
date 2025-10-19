"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Linkedin as LinkedinIcon } from "lucide-react";
import {
  Play,
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
  PinterestLogo,
} from "phosphor-react";
import MovingQuote from "@/components/MovingQuote";
import { Menu, X } from "lucide-react";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { ScrollSmoother } from "gsap/ScrollSmoother";



gsap.registerPlugin(ScrollTrigger);

export default function YamanPixelHome() {
  const container = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socials = [
    { name: "LinkedIn", icon: LinkedinIcon, link: "https://linkedin.com/in/yamanpixel" },
    { name: "Instagram", icon: InstagramLogo, link: "https://instagram.com/yamanpixel" },
    { name: "YouTube", icon: YoutubeLogo, link: "https://youtube.com/@yamanpixel" },
    { name: "Pinterest", icon: PinterestLogo, link: "https://pinterest.com/yamanpixel" },
  ];

  useEffect(() => {
    if (!container.current) return;
  
    // 🧩 Gerekli pluginleri kaydet
    gsap.registerPlugin(ScrollTrigger);
    const { ScrollToPlugin } = require("gsap/ScrollToPlugin");
    gsap.registerPlugin(ScrollToPlugin);
  
    // 🔹 Smooth Scroll Yapısı
    let scrollY = 0;
    let current = 0;
    let ease = 0.08;
    let rafId: number;
  
    const update = () => {
      scrollY = window.scrollY;
      current += (scrollY - current) * ease;
      gsap.set(container.current, { y: -current });
      rafId = requestAnimationFrame(update);
    };
  
    document.body.style.height = `${container.current.scrollHeight}px`;
    gsap.set(container.current, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      willChange: "transform",
    });
  
    update();
  
    // 🔹 Navbar linkleri düzgün çalışsın (#anchor scroll)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const section = document.querySelector(targetId);
        if (!section) return;
  
        e.preventDefault();
  
        gsap.to(window, {
          duration: 1,
          ease: "power2.inOut",
          scrollTo: {
            y: section,
            offsetY: 0, // gerekiyorsa navbar yüksekliği kadar ekleyebilirsin
          },
        });
      });
    });
  
    // 🔹 Mevcut animasyonlarını koru
    const ctx = gsap.context(() => {
      // ✨ Hero giriş animasyonu
      gsap.from("#heroTitle", {
        opacity: 0,
        y: 60,
        scale: 1.05,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from("#heroText", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.from("#heroButton", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
      });
  
      // 🎬 About
      gsap.from("#about .grid div", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },
        opacity: 0,
        x: -40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
  
      gsap.from("#about .text-block", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
        opacity: 0,
        x: 60,
        duration: 1.2,
        ease: "power3.out",
      });
  
      // 📽️ Gallery
      gsap.from("#gallery .gallery-item", {
        scrollTrigger: {
          trigger: "#gallery",
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
  
      // 🎞️ Projects
      gsap.from("#projects .project-card", {
        scrollTrigger: {
          trigger: "#projects",
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.95,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
  
      // 📩 Contact
      gsap.from("#contact .contact-block", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });
    }, container);

    // 🔼 Scroll to Top Button görünürlüğü
      const topButton = document.getElementById("backToTop");
      if (topButton) {
        const handleScroll = () => {
          if (window.scrollY > 300) { // 👈 burada görünme eşiğini ayarlayabilirsin
            gsap.to(topButton, {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.4,
              ease: "power2.out",
            });
          } else {
            gsap.to(topButton, {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.4,
              ease: "power2.out",
            });
          }
        };

        window.addEventListener("scroll", handleScroll);

      }
  
    // 🧹 Temizlik
    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.height = "";
      gsap.set(container.current, { clearProps: "all" });
      ctx.revert();
    };
  }, []);

  return (
    <main ref={container} className="min-h-screen bg-neutral-950 text-neutral-100 font-sans overflow-x-hidden">
      
      
      {/* HEADER */}
      <Header></Header>

      {/* HERO */}
      <section id="hero" className="relative text-center py-16 sm:py-24 bg-neutral-900 overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover opacity-50" autoPlay loop muted playsInline>
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 px-4 sm:px-8">
        <h2 id="heroTitle" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-tight">
          Capturing Emotion<br className="hidden sm:block" /> Through Cinematic Lenses
        </h2>
          <p id="heroText" className="mt-6 text-neutral-300 text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto">
            A filmmaker & visual artist based in Türkiye — crafting visuals that move souls.
          </p>
          <Button
            id="heroButton"
            className="mt-8 bg-[#E4E0D7] text-black hover:bg-[#cfcabf] text-sm sm:text-base px-6 py-3"
            onClick={() => {
            const projectsSection = document.querySelector("#projects");
            if (projectsSection) {
            gsap.to(window, {
              duration: 1,
              ease: "power2.inOut",
              scrollTo: {
              y: projectsSection,
              offsetY: 0,
            },
            });
            }
            }}
          >
            Explore My Work
          </Button>

        </div>
      </section>

      {/* QUOTE SECTION */}
      <MovingQuote />

      {/* ABOUT */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1 w-full max-w-md sm:max-w-none">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl aspect-[4/5] bg-neutral-900">
              <img
                src={`/images/about-${i}.jpg`}
                alt={`About image ${i}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-4 sm:space-y-6 max-w-lg text-left text-block">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
            A Cinematic Eye for Real Emotion
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            I’m <span className="text-white font-medium">Ömer Yaman</span> — a filmmaker and visual artist capturing cinematic stories through motion and still frames. My work blends atmosphere, light, and raw emotion to create visuals that feel timeless and human.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-neutral-900 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h3 className="text-3xl font-bold uppercase mb-10 text-center">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {["Cinematic", "Promo", "Street", "Travel"].map((cat, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl border border-neutral-800 gallery-item">
                <video
                  src={`/videos/${cat.toLowerCase()}.mp4`}
                  poster={`/images/${cat.toLowerCase()}.jpg`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h4 className="text-xl sm:text-2xl font-bold uppercase">{cat}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold uppercase">Projects</h3>
          <Link 
            href="/projects" 
            className="text-sm text-neutral-400 uppercase hover:text-neutral-200 transition-colors"
          >
            Show All →
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {["BMX Motion", "Skateboarding Spirit", "Power Of Tricking", "Coming Soon..."].map((title, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 project-card aspect-video cursor-pointer group"
              onClick={() => setActiveVideo(`/videos/project-${i + 1}.mp4`)} // 👈 tıklanınca modal açılacak
            >
              <video
                src={`/videos/project-${i + 1}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex justify-between items-center">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold">{title}</h4>
                  <p className="text-neutral-400 text-[11px] sm:text-xs">Directed by Ömer Yaman</p>
                </div>
                <Button size="icon" className="rounded-full bg-white/90 text-black">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl mx-4"
            onClick={(e) => e.stopPropagation()} // dışarı tıklayınca kapanmasın
          >
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 sm:p-2.5"
            >
              ✕
            </button>
          </div>
        </div>
      )}


      {/* CONTACT */}
      <footer id="contact" className="bg-neutral-900 py-14 sm:py-16 contact-block">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <p className="text-neutral-300">Say hello ✉️</p>
              <a href="mailto:hello@yamanpixel.com" className="text-base sm:text-lg font-semibold text-[#E4E0D7] hover:opacity-80">
                hello@yamanpixel.com
              </a>
            </div>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.name} href={s.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 sm:mt-10 rounded-2xl bg-[#E4E0D7] p-4 sm:p-6 text-black text-center text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
            Photography & Film Making
          </div>
          <p className="text-center text-[11px] sm:text-xs text-neutral-500 mt-4 sm:mt-6">
            © {new Date().getFullYear()} YamanPixel — All rights reserved.
          </p>
        </div>
      </footer>

      {/* 🔼 Back to Top Button */}
      <button
        id="backToTop"
        onClick={() => {
          gsap.to(window, {
            duration: 1.2,
            ease: "power2.inOut",
            scrollTo: { y: 0 },
          });
        }}
        className="fixed bottom-6 left-6 z-50 bg-white/10 hover:bg-white/20 text-white border border-white/20 
           rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-md
           transition-all duration-300 opacity-0 pointer-events-none hover:scale-110 hover:-translate-y-1"
      >
        ▲
      </button>
    </main>
  );
}
