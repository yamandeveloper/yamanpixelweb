"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "phosphor-react";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function ProjectsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [tab, setTab] = useState<"videos" | "photos">("videos");

  const videoProjects = [
    {
      title: "BMX Motion",
      desc: "Exploring freedom and rhythm through cinematic motion.",
      video: "/videos/project-1.mp4",
    },
    {
      title: "Skateboarding Spirit",
      desc: "Energy and light moving through the city.",
      video: "/videos/project-2.mp4",
    },
    {
      title: "Voices of the Street",
      desc: "Raw emotions told through color and shadow.",
      video: "/videos/project-3.mp4",
    },
    {
      title: "Wander North",
      desc: "Cinematic solitude surrounded by nature.",
      video: "/videos/project-4.mp4",
    },
  ];

  const photoProjects = [
    { title: "Watch with Bmx", image: "/images/about-1.jpg" },
    { title: "Silent Corners", image: "/images/about-2.jpg" },
    { title: "Reflection Of Skater", image: "/images/about-3.jpg" },
    { title: "Old Town", image: "/images/about-4.jpg" },
    { title: "Deneme", image: "/images/about-1.jpg" },
    { title: "Deneme", image: "/images/about-3.jpg" },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans overflow-x-hidden">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <section className="relative text-center py-24 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase">
            All Projects
          </h1>
          <p className="text-neutral-300 mt-6 text-lg max-w-2xl mx-auto">
            A collection of cinematic visuals — motion and stills that tell stories.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 mt-10 px-8 py-3 text-sm sm:text-base uppercase tracking-wider 
                       font-semibold bg-[#E4E0D7] text-black rounded-full hover:bg-[#cfcabf] transition-all duration-300"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </section>

      {/* TABS */}
      <div className="flex justify-center mt-12 mb-10">
        <div className="flex bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden">
          <button
            onClick={() => setTab("videos")}
            className={`px-6 py-2 text-sm uppercase transition-all duration-300 ${
              tab === "videos"
                ? "bg-[#E4E0D7] text-black font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setTab("photos")}
            className={`px-6 py-2 text-sm uppercase transition-all duration-300 ${
              tab === "photos"
                ? "bg-[#E4E0D7] text-black font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Photos
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-20">
        <AnimatePresence mode="wait">
          {tab === "videos" ? (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videoProjects.map((project, i) => (
                <motion.div
                  key={i}
                  className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group cursor-pointer"
                  onClick={() => setActiveVideo(project.video)}
                >
                  <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden">
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 z-10">
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <p className="text-sm text-neutral-400">{project.desc}</p>
                  </div>
                  <Button
                    size="icon"
                    className="absolute bottom-6 right-6 rounded-full bg-white/90 text-black hover:bg-white z-20"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {photoProjects.map((photo, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 group"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <h3 className="text-xl font-semibold">{photo.title}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 rounded-full p-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-neutral-900 py-14 sm:py-16 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center text-neutral-500 text-xs">
          © {new Date().getFullYear()} YamanPixel — All rights reserved.
        </div>
      </footer>
    </main>
  );
}
