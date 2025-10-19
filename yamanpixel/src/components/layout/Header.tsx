"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // 🎬 Header giriş animasyonu
  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      const logo = headerRef.current!.querySelector(".logo");
      const links = headerRef.current!.querySelectorAll(".nav-link");

      gsap.set([logo, links], { opacity: 0, y: -20 });
      gsap.to(logo, { opacity: 1, y: 0, duration: 1, ease: "expo.out" });
      gsap.to(links, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        delay: 0.3,
        duration: 0.8,
        ease: "expo.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // 🌫️ Scroll efekti
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);

    const ctx = gsap.context(() => {
      gsap.to(headerRef.current, {
        backgroundColor: isScrolled ? "rgba(15,15,15,0.9)" : "rgba(0,0,0,0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: isScrolled
          ? "1px solid rgba(120,120,120,0.2)"
          : "1px solid transparent",
        duration: 0.8,
        ease: "power2.out",
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, [isScrolled]);

  // 📱 Menü aç/kapat animasyonları
  const openMenu = () => {
    setIsMenuOpen(true);
    gsap.set(overlayRef.current, { opacity: 0, display: "block" });
    gsap.set(menuRef.current, { x: "30%", opacity: 0, display: "flex" });

    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "expo.out" } });

    tl.to(overlayRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
    .to(menuRef.current, { x: "0%", opacity: 1 }, 0.1);

    const links = menuRef.current ? menuRef.current.querySelectorAll("a") : [];
    if (links.length > 0) {
      tl.from(
        links,
        {
          opacity: 0,
          x: 20,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        0.25
      );
    }

    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" },
      onComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
        if (overlayRef.current) overlayRef.current.style.display = "none";
      },
    });

    tl.to(menuRef.current, { x: "40%", opacity: 0 }, 0)
      .to(overlayRef.current, { opacity: 0 }, 0.1);
  };

  // 🧭 Menüde smooth scroll çalışsın
  const handleSmoothScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power2.inOut",
      });
    }
    closeMenu();
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 flex justify-between items-center transition-all duration-500"
      >
        <Link
          href="/"
          className="logo text-2xl font-extrabold tracking-tight text-white hover:text-neutral-300 transition-colors"
        >
          YAMANPIXEL
        </Link>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex space-x-8 text-sm uppercase text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll(link.href);
              }}
              className="nav-link hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobil Buton */}
        <button
          onClick={openMenu}
          className="menu-btn md:hidden text-neutral-200 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* 📱 Mobil Menü */}
      {isMenuOpen && (
        <>
          <div
            ref={overlayRef}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-lg z-40"
          />
          <div
            ref={menuRef}
            className="fixed inset-y-0 right-0 w-3/4 sm:w-1/2 bg-neutral-900/95 
                       border-l border-neutral-800 flex flex-col p-10 
                       text-lg uppercase text-neutral-200 z-50"
          >
            <button
              onClick={closeMenu}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col gap-6 mt-16">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto text-sm text-neutral-500">
              © {new Date().getFullYear()} YamanPixel
            </div>
          </div>
        </>
      )}
    </>
  );
}
