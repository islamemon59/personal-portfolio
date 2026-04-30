"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Download,
  FolderGit2,
  GraduationCap,
  Home,
  Mail,
  Menu,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { navItems, profile } from "@/data/portfolio";

gsap.registerPlugin(ScrollToPlugin);

const navDockIcons: Record<string, LucideIcon> = {
  home: Home,
  about: UserRound,
  skills: Wrench,
  education: GraduationCap,
  experience: BriefcaseBusiness,
  projects: FolderGit2,
  contact: Mail,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const dockRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return undefined;
    }

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.65] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    if (window.portfolioScrollTo) {
      window.portfolioScrollTo(id);
      return;
    }

    gsap.to(window, {
      duration: 0.95,
      ease: "power3.inOut",
      scrollTo: { y: target, offsetY: 84 },
    });
  };

  const handleDockPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dockItems = dockRef.current?.querySelectorAll<HTMLElement>(".nav-dock-item");

    if (!dockItems?.length) {
      return;
    }

    dockItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
      const proximity = Math.max(0, 1 - distance / 118);
      const scale = 1 + proximity * 0.24;
      const lift = proximity * -5;

      item.style.setProperty("--dock-scale", scale.toFixed(3));
      item.style.setProperty("--dock-lift", `${lift.toFixed(2)}px`);
    });
  };

  const resetDockItems = () => {
    const dockItems = dockRef.current?.querySelectorAll<HTMLElement>(".nav-dock-item");

    dockItems?.forEach((item) => {
      item.style.setProperty("--dock-scale", "1");
      item.style.setProperty("--dock-lift", "0px");
    });
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label="Go to homepage">
          <span className="brand-mark" aria-hidden="true">
            <Code2 size={20} />
          </span>
          <span>{profile.name}</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          className={`nav-links nav-dock ${isOpen ? "is-open" : ""}`}
          onPointerMove={handleDockPointerMove}
          onPointerLeave={resetDockItems}
          ref={dockRef}
          role="toolbar"
          aria-label="Portfolio sections"
        >
          {navItems.map((item) => {
            const Icon = navDockIcons[item.id] || Code2;

            return (
              <button
                className={`nav-dock-item ${activeSection === item.id ? "is-active" : ""}`}
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-dock-tooltip" role="tooltip">
                  {item.label}
                </span>
                <span className="nav-dock-icon" aria-hidden="true">
                  <Icon size={17} />
                </span>
                <span className="nav-dock-label">{item.label}</span>
              </button>
            );
          })}
          <a className="nav-resume nav-dock-item" href={profile.resume} download>
            <span className="nav-dock-tooltip" role="tooltip">
              Resume
            </span>
            <span className="nav-dock-icon" aria-hidden="true">
              <Download size={16} />
            </span>
            <span className="nav-dock-label">Resume</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
