"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, PointerEvent, RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import type { SimpleIcon } from "simple-icons";
import {
  siCss,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siGooglechrome,
  siHtml5,
  siJavascript,
  siLighthouse,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPrisma,
  siReact,
  siTailwindcss,
  siVercel,
  siWordpress,
} from "simple-icons";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Hand,
  Layers3,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Send,
  Server,
  Settings2,
  Sparkles,
  X,
  Zap,
  Wrench,
} from "lucide-react";
import {
  about,
  education,
  experience,
  focusAreas,
  navItems,
  profile,
  projects,
  skillGroups,
  stats,
  type IconMap,
  type Project,
} from "@/data/portfolio";
import { useMagicBento } from "@/components/useMagicBento";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

declare global {
  interface Window {
    portfolioScrollTo?: (id: string) => void;
    portfolioScrollTop?: () => void;
  }
}

const socialIcons: IconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const skillIcons: IconMap = {
  Frontend: MonitorSmartphone,
  Backend: Server,
  Database,
  Tools: Wrench,
  Other: Settings2,
};

const orbitLabels = ["UI", "API", "SEO", "UX"];

const educationMarquee = [
  "Academic Foundation",
  "Responsive UI",
  "React Practice",
  "JavaScript Logic",
  "Clean Layouts",
  "Continuous Learning",
];

const experienceMarquee = [
  "Client Ready",
  "API Integration",
  "UI Debugging",
  "SEO Setup",
  "Performance",
  "Reusable Components",
];

const projectMarquee = [
  "Case Studies",
  "Animated Cards",
  "Live Links",
  "Tech Badges",
  "Responsive Screens",
  "Project Details",
];

const skillIconMap: Record<string, SimpleIcon> = {
  HTML5: siHtml5,
  CSS3: siCss,
  JavaScript: siJavascript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  MongoDB: siMongodb,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Git: siGit,
  GitHub: siGithub,
  Figma: siFigma,
  Postman: siPostman,
  "Chrome DevTools": siGooglechrome,
  WordPress: siWordpress,
  Deployment: siVercel,
  "Performance Optimization": siLighthouse,
};

type NotificationState = {
  type: "success" | "error" | "info";
  title: string;
  message: string;
};

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-header gsap-reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function MarqueeRail({
  items,
  direction = "left",
}: {
  items: string[];
  direction?: "left" | "right";
}) {
  const repeatedItems = [...items, ...items];

  return (
    <div className="marquee-rail gsap-reveal" aria-hidden="true">
      <div className="marquee-track" data-direction={direction}>
        {repeatedItems.map((item, index) => (
          <span key={`${item}-${index}`}>
            <Zap size={15} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectScrollStack({
  items,
  onImagePointerMove,
}: {
  items: Project[];
  onImagePointerMove: (event: PointerEvent<HTMLElement>) => void;
}) {
  const storyItems = items.flatMap((project) => {
    const gallery = (project.gallery?.length ? project.gallery : [project.image]).slice(0, 3);

    return gallery.map((image, index) => ({
      image,
      imageIndex: index,
      project,
      totalImages: gallery.length,
    }));
  });

  return (
    <div className="project-scroll-stack" aria-label="Pinned project screenshot stack">
      <div className="project-stack-shell">
        <div className="project-stack-viewport">
          <div className="project-stack-track">
            {storyItems.map(({ image, imageIndex, project }) => (
              <Link
                className="project-stack-card"
                href={`/projects/${project.slug}`}
                key={`${project.slug}-${imageIndex}-${image}`}
                onPointerMove={onImagePointerMove}
                aria-label={`${project.title} screenshot ${imageIndex + 1}`}
              >
                <span className="project-stack-image">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${imageIndex + 1}`}
                    width={1800}
                    height={1125}
                  />
                </span>
              </Link>
            ))}
          </div>
          <div className="project-stack-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function TechIcon({ skill }: { skill: string }) {
  const icon = skillIconMap[skill];

  if (!icon) {
    return <Sparkles size={14} />;
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

function useInteractiveBackground(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!rootRef.current) {
      return undefined;
    }

    const root = document.documentElement;
    const setX = gsap.quickSetter(root, "--cursor-x", "px");
    const setY = gsap.quickSetter(root, "--cursor-y", "px");

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      setX(event.clientX);
      setY(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [rootRef]);
}

function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      window.portfolioScrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      window.portfolioScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
      return () => {
        delete window.portfolioScrollTo;
        delete window.portfolioScrollTop;
      };
    }

    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.18,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    window.portfolioScrollTo = (id: string) => {
      const target = document.getElementById(id);
      if (!target) {
        return;
      }

      lenis.scrollTo(target, {
        offset: -84,
        duration: 1.18,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    };

    window.portfolioScrollTop = () => {
      lenis.scrollTo(0, {
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    };

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.portfolioScrollTo;
      delete window.portfolioScrollTop;
    };
  }, []);
}

export default function PortfolioPage() {
  const rootRef = useRef<HTMLElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const scrollPercentRef = useRef<HTMLSpanElement>(null);
  const [activeFocus, setActiveFocus] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  useSmoothScroll();
  useInteractiveBackground(rootRef);
  useMagicBento(rootRef);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".gsap-reveal, .hero-visual-item", { autoAlpha: 1, y: 0 });
      }

      const root = document.documentElement;
      const checkpoints = gsap.utils.toArray<HTMLButtonElement>(".scroll-checkpoint");
      const updateScrollJourney = (progress: number) => {
        const percent = Math.round(progress * 100);
        const activeIndex = Math.min(
          navItems.length - 1,
          Math.max(0, Math.round(progress * (navItems.length - 1)))
        );

        root.style.setProperty("--scroll-progress", progress.toFixed(4));
        const hue = 198;
        root.style.setProperty("--scroll-hue", String(hue));
        root.style.setProperty("--scroll-hue-two", String(hue));
        root.style.setProperty("--scroll-hue-three", String(hue));
        root.style.setProperty("--scroll-shift-x", `${Math.round(progress * 620)}px`);
        root.style.setProperty("--scroll-shift-y", `${Math.round(progress * -860)}px`);
        root.style.setProperty("--scroll-shift-x-soft", `${Math.round(progress * -220)}px`);
        root.style.setProperty("--scroll-shift-y-soft", `${Math.round(progress * -340)}px`);
        root.style.setProperty("--scroll-rotate", `${Math.round(progress * 180)}deg`);
        root.style.setProperty("--scroll-rotate-soft", `${Math.round(progress * 16)}deg`);
        root.style.setProperty("--scroll-rotate-wide", `${Math.round(progress * 68)}deg`);
        root.style.setProperty("--scroll-rotate-reverse", `${Math.round(progress * -82)}deg`);
        root.style.setProperty("--scroll-depth", `${Math.round(progress * 100)}vh`);
        root.style.setProperty("--scroll-field-y", `${Math.round(progress * -7)}vh`);
        root.style.setProperty("--scroll-light-x", `${Math.round(12 + progress * 68)}vw`);
        root.style.setProperty("--scroll-size", `${Math.round((1.08 + progress * 0.18) * 1000) / 1000}`);
        root.style.setProperty("--scroll-percent-size", `${Math.round(progress * 10000) / 100}%`);
        root.style.setProperty("--scroll-wave-one-y", `${Math.round(8 + progress * 26)}vh`);
        root.style.setProperty("--scroll-wave-two-y", `${Math.round(4 + progress * 20)}vh`);

        if (scrollPercentRef.current) {
          scrollPercentRef.current.textContent = `${percent}%`;
        }

        checkpoints.forEach((checkpoint, index) => {
          checkpoint.dataset.active = String(index === activeIndex);
        });
      };

      updateScrollJourney(0);
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => updateScrollJourney(self.progress),
        onRefresh: (self) => updateScrollJourney(self.progress),
      });

      if (reduceMotion) {
        return;
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-kicker", { autoAlpha: 0, y: 18, duration: 0.55 })
        .from(".hero-title-line", { autoAlpha: 0, y: 34, duration: 0.7, stagger: 0.08 }, "-=0.25")
        .from(".hero-copy p, .hero-actions, .social-row", {
          autoAlpha: 0,
          y: 22,
          duration: 0.6,
          stagger: 0.08,
        }, "-=0.2")
        .from(".hero-visual-item", {
          autoAlpha: 0,
          y: 36,
          scale: 0.96,
          duration: 0.7,
          stagger: 0.1,
        }, "-=0.45");

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".skill-meter span").forEach((meter) => {
        gsap.fromTo(
          meter,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: meter,
              start: "top 88%",
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 78%",
            end: "bottom 35%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-preview-frame:first-child img").forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.to(".orbit-chip", {
        y: (index) => (index % 2 === 0 ? -12 : 12),
        x: (index) => (index % 2 === 0 ? 8 : -8),
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.18,
      });

      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
        const distance = track.scrollWidth / 2;

        if (track.dataset.direction === "right") {
          gsap.fromTo(track, { x: -distance }, { x: 0, duration: 24, repeat: -1, ease: "none" });
          return;
        }

        gsap.to(track, { x: -distance, duration: 24, repeat: -1, ease: "none" });
      });

      gsap.utils.toArray<HTMLElement>(".project-scroll-stack").forEach((stack) => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-stack-card", stack);
        const progressBar = stack.querySelector<HTMLElement>(".project-stack-progress span");

        if (cards.length < 2) {
          return;
        }

        gsap.set(cards, {
          zIndex: (index) => index + 1,
          y: (index) => (index === 0 ? 0 : 120),
          scale: (index) => (index === 0 ? 1 : 0.92),
          opacity: (index) => (index === 0 ? 1 : 0),
          rotate: (index) => (index % 2 === 0 ? -2.4 : 2.4),
          filter: "blur(0px)",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stack,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 3.4, cards.length * 430)}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                progressBar.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) {
            return;
          }

          const previousCard = cards[index - 1];

          timeline
            .to(
              previousCard,
              {
                y: -34 - Math.min(index, 3) * 8,
                scale: 0.94 - Math.min(index, 3) * 0.025,
                opacity: 0.34,
                rotate: index % 2 === 0 ? -4 : 4,
                filter: "blur(1px)",
                duration: 0.62,
                ease: "power2.out",
              },
              index - 1
            )
            .to(
              card,
              {
                y: 0,
                scale: 1,
                opacity: 1,
                rotate: 0,
                filter: "blur(0px)",
                duration: 0.72,
                ease: "power2.out",
              },
              index - 0.92
            );
        });
      });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const contactSection = contactFormRef.current ?? document.getElementById("contact");

    if (!contactSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTopButton(entry.isIntersecting);
      },
      {
        rootMargin: "-18% 0px -18% 0px",
        threshold: 0.12,
      }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) {
      return;
    }

    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) {
        return;
      }

      window.portfolioScrollTo?.(id);
    }, 120);
  }, []);

  const socialLinks = useMemo(
    () =>
      profile.socials.map((social) => {
        const Icon = socialIcons[social.label] || ExternalLink;
        return { ...social, Icon };
      }),
    []
  );

  const handleMagneticMove = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);

    gsap.to(card, {
      rotateX: y * -4,
      rotateY: x * 5,
      y: -4,
      transformPerspective: 900,
      duration: 0.32,
      ease: "power3.out",
    });
  };

  const handleMagneticLeave = (event: PointerEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.45,
      ease: "elastic.out(1, 0.55)",
    });
  };

  const handleInteractivePointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--pointer-x", `${x}%`);
    element.style.setProperty("--pointer-y", `${y}%`);

    gsap.to(element, {
      scale: 1.025,
      duration: 0.22,
      ease: "power3.out",
    });
  };

  const handleInteractivePointerLeave = (event: PointerEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      scale: 1,
      duration: 0.32,
      ease: "power3.out",
    });
  };

  const handleImagePointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--image-x", `${x}%`);
    element.style.setProperty("--image-y", `${y}%`);
  };

  const scrollToProjects = () => {
    const target = document.getElementById("projects");
    if (!target) {
      return;
    }

    if (window.portfolioScrollTo) {
      window.portfolioScrollTo("projects");
      return;
    }

    gsap.to(window, {
      duration: 0.95,
      ease: "power3.inOut",
      scrollTo: { y: target, offsetY: 84 },
    });
  };

  const scrollToTop = () => {
    if (window.portfolioScrollTop) {
      window.portfolioScrollTop();
      return;
    }

    gsap.to(window, {
      duration: 0.9,
      ease: "power3.inOut",
      scrollTo: { y: 0 },
    });
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");

    setIsSending(true);
    setFormStatus("Sending message securely...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Message could not be sent.");
      }

      setNotification({
        type: "success",
        title: "Message sent",
        message: "Your message reached the inbox. I will reply as soon as possible.",
      });
      setFormStatus("Message sent successfully.");
      contactFormRef.current?.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the message.";

      setNotification({
        type: "error",
        title: "Message not sent",
        message: errorMessage,
      });
      setFormStatus("Message could not be sent.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="portfolio-page-shell" ref={rootRef}>
      <div className="interactive-cursor" aria-hidden="true">
        <span className="cursor-ring" />
        <span className="cursor-dot" />
      </div>

      <div className="scroll-journey-field" aria-hidden="true">
        <span className="scroll-grid-plane" />
        <span className="scroll-wave scroll-wave-one" />
        <span className="scroll-wave scroll-wave-two" />
        <span className="scroll-depth-light" />
      </div>

      <aside className="scroll-progress-system" aria-label="Page scroll progress">
        <div className="scroll-progress-core">
          <span className="scroll-rail">
            <span className="scroll-fill" />
            <span className="scroll-comet" />
          </span>
          <div className="scroll-checkpoints">
            {navItems.map((item) => (
              <button
                className="scroll-checkpoint"
                data-active="false"
                key={item.id}
                type="button"
                onClick={() => window.portfolioScrollTo?.(item.id)}
                aria-label={`Scroll to ${item.label}`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <span className="scroll-percent" ref={scrollPercentRef}>
          0%
        </span>
      </aside>

      <section className="hero section" id="home">
        <div className="interactive-backdrop" aria-hidden="true">
          <span className="ambient-ribbon ribbon-one" />
          <span className="ambient-ribbon ribbon-two" />
          <span className="ambient-ribbon ribbon-three" />
          <span className="mesh-line mesh-line-one" />
          <span className="mesh-line mesh-line-two" />
          <span className="mesh-line mesh-line-three" />
          <div className="background-nodes">
            {Array.from({ length: 14 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="status-pill hero-kicker">
              <Sparkles size={16} />
              {profile.badge}
            </span>
            <h1>
              <span className="hero-title-line">Hi, I am {profile.name}</span>
              <span className="hero-title-line">{profile.role}</span>
            </h1>
            <p>{profile.intro}</p>
            <div className="hero-actions" aria-label="Hero actions">
              <a
                className="btn btn-primary interactive-button"
                href={profile.resume}
                download
                onPointerMove={handleInteractivePointerMove}
                onPointerLeave={handleInteractivePointerLeave}
              >
                <Download size={18} />
                Download Resume
              </a>
              <button
                className="btn btn-secondary interactive-button"
                type="button"
                onClick={scrollToProjects}
                onPointerMove={handleInteractivePointerMove}
                onPointerLeave={handleInteractivePointerLeave}
              >
                View Projects
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="social-row" aria-label="Social links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  className="social-orb"
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onPointerMove={handleInteractivePointerMove}
                  onPointerLeave={handleInteractivePointerLeave}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-media">
            <div
              className="portrait-frame hero-visual-item magnetic-card"
              onPointerMove={(event) => {
                handleMagneticMove(event);
                handleImagePointerMove(event);
              }}
              onPointerLeave={handleMagneticLeave}
            >
              <span className="portrait-aura" aria-hidden="true" />
              <Image
                src={profile.image}
                alt={`${profile.name} professional portrait placeholder`}
                width={1200}
                height={1400}
                priority
              />
              <div className="orbit-ring" aria-hidden="true">
                {orbitLabels.map((label) => (
                  <span className="orbit-chip" key={label}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="code-card hero-visual-item" aria-label="Portfolio coding snapshot">
              <span>portfolio.ts</span>
              <code>
                build({`{`} responsive: true, motion: "gsap", ui: "premium" {`}`});
              </code>
            </div>
            <div className="hero-stats hero-visual-item magic-bento-grid" aria-label="Portfolio quick stats">
              {stats.map((item) => (
                <div className="magic-bento-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="hero-scroll-cue interactive-button"
          type="button"
          onClick={() => window.portfolioScrollTo?.("about")}
          onPointerMove={handleInteractivePointerMove}
          onPointerLeave={handleInteractivePointerLeave}
          aria-label="Scroll to about section"
        >
          <span>Scroll</span>
          <ArrowDown size={17} />
        </button>
      </section>

      <section className="section" id="about">
        <div className="section-inner">
          <SectionHeader
            eyebrow="About Me"
            title="A developer focused on useful, polished web experiences"
            text="The story, working style, and focus areas behind the portfolio."
          />
          <div className="about-grid magic-bento-grid">
            <article
              className="text-panel about-story-panel gsap-reveal magnetic-card magic-bento-card"
              onPointerMove={handleMagneticMove}
              onPointerLeave={handleMagneticLeave}
            >
              <span className="panel-kicker">
                <Sparkles size={15} />
                Design-aware development
              </span>
              <p>{about}</p>
              <p>
                Outside programming, I like exploring technology trends, watching tutorials, and
                improving creative skills that make websites feel more thoughtful.
              </p>
              <div className="content-metrics" aria-label="Development focus metrics">
                <span>
                  <strong>95%</strong>
                  UI Care
                </span>
                <span>
                  <strong>Fast</strong>
                  Load Feel
                </span>
                <span>
                  <strong>Clean</strong>
                  Structure
                </span>
              </div>
              <div className="about-energy-map" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>
            <aside
              className="focus-lab gsap-reveal magnetic-card magic-bento-card"
              onPointerMove={handleMagneticMove}
              onPointerLeave={handleMagneticLeave}
            >
              <div className="focus-preview">
                <span>{String(activeFocus + 1).padStart(2, "0")}</span>
                <h3>{focusAreas[activeFocus].title}</h3>
                <p>{focusAreas[activeFocus].detail}</p>
              </div>
              <div className="focus-list">
                {focusAreas.map((area, index) => (
                  <button
                    className={activeFocus === index ? "is-active" : ""}
                    key={area.title}
                    type="button"
                    onMouseEnter={() => setActiveFocus(index)}
                    onFocus={() => setActiveFocus(index)}
                  >
                    <CheckCircle2 size={18} />
                    <span>{area.title}</span>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section alt-section" id="skills">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Skills"
            title="Technical strengths organized by real project needs"
            text="Graphical skill groups make it easy to understand where I can contribute."
          />
          <div className="skills-grid magic-bento-grid">
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.category] || Layers3;
              return (
                <article
                  className="skill-card gsap-reveal magnetic-card magic-bento-card"
                  key={group.category}
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={handleMagneticLeave}
                >
                  <div className="card-heading">
                    <span className="icon-box">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3>{group.category}</h3>
                      <p>{group.level}</p>
                    </div>
                  </div>
                  <div className="skill-meter" aria-label={`${group.category} skill level`}>
                    <span style={{ width: `${group.score}%` }} />
                  </div>
                  <div className="badge-list">
                    {group.skills.map((skill) => (
                      <span key={skill}>
                        <TechIcon skill={skill} />
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="education">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Education"
            title="Academic foundation and continued learning"
            text="Replace these demo entries with your real institution, subject, result, and course details."
          />
          <div className="timeline">
            <span className="timeline-progress" aria-hidden="true" />
            {education.map((item) => (
              <article className="timeline-item gsap-reveal magic-bento-card" key={item.degree}>
                <div className="timeline-icon" aria-hidden="true">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.degree}</h3>
                  <p className="timeline-place">{item.institution}</p>
                  <p>{item.details}</p>
                </div>
              </article>
            ))}
          </div>
          <MarqueeRail items={educationMarquee} />
        </div>
      </section>

      <section className="section alt-section" id="experience">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Experience"
            title="Practical work that shows how projects get finished"
            text="Use formal roles, freelance work, internships, or serious project experience here."
          />
          <MarqueeRail items={experienceMarquee} direction="right" />
          <div className="experience-grid magic-bento-grid">
            {experience.map((item) => (
              <article
                className="experience-card gsap-reveal magnetic-card magic-bento-card"
                key={item.role}
                onPointerMove={handleMagneticMove}
                onPointerLeave={handleMagneticLeave}
              >
                <div className="card-heading">
                  <span className="icon-box">
                    <BriefcaseBusiness size={22} />
                  </span>
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                </div>
                <span className="date-line">
                  <CalendarDays size={16} />
                  {item.period}
                </span>
                <ul>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Projects"
            title="Selected builds with dedicated detail pages"
            text="Each project includes visual context, technology badges, and a complete case-study route."
          />
          <MarqueeRail items={projectMarquee} />
          <ProjectScrollStack
            items={projects}
            onImagePointerMove={handleImagePointerMove}
          />
          <div className="projects-grid magic-bento-grid">
            {projects.map((project) => {
              const gallery = (project.gallery?.length ? project.gallery : [project.image]).slice(0, 3);

              return (
                <article
                  className="project-card gsap-reveal magnetic-card magic-bento-card"
                  key={project.slug}
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={handleMagneticLeave}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="project-image-link"
                    onPointerMove={handleImagePointerMove}
                  >
                    <div className="project-preview-stack">
                      {gallery.map((image, index) => (
                        <span
                          className="project-preview-frame"
                          key={`${project.slug}-${index}-${image}`}
                        >
                          <Image
                            src={image}
                            alt={`${project.title} screenshot ${index + 1}`}
                            width={1600}
                            height={1000}
                          />
                        </span>
                      ))}
                    </div>
                    <span className="project-preview-dots" aria-hidden="true">
                      {gallery.map((image, index) => (
                        <span key={`${image}-${index}`} />
                      ))}
                    </span>
                    <span className="project-image-glow" aria-hidden="true" />
                    <span className="project-image-cta">
                      <Hand size={16} />
                      Explore Case Study
                    </span>
                  </Link>
                  <div className="project-body">
                    <span className="project-eyebrow">{project.eyebrow}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="badge-list">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <Link
                      className="text-link interactive-link"
                      href={`/projects/${project.slug}`}
                      onPointerMove={handleInteractivePointerMove}
                      onPointerLeave={handleInteractivePointerLeave}
                    >
                      View Details
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="section-inner">
          <SectionHeader
            eyebrow="Contact"
            title="Easy ways to start a conversation"
            text="Replace the placeholder contact information with your real details before publishing."
          />
          <div className="contact-grid magic-bento-grid">
            <aside className="contact-list gsap-reveal magic-bento-card">
              <a href={`mailto:${profile.email}`}>
                <Mail size={20} />
                <span>{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <Phone size={20} />
                <span>{profile.phone}</span>
              </a>
              <a href={`https://wa.me/${profile.whatsapp.replace(/[^\d]/g, "")}`}>
                <MessageCircle size={20} />
                <span>{profile.whatsapp}</span>
              </a>
              <div>
                <MapPin size={20} />
                <span>{profile.location}</span>
              </div>
              <div className="signal-panel" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </aside>

            <form
              className="contact-form gsap-reveal magic-bento-card"
              onSubmit={handleContactSubmit}
              ref={contactFormRef}
            >
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input name="subject" type="text" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} required />
              </label>
              <button
                className="btn btn-primary interactive-button"
                type="submit"
                disabled={isSending}
                onPointerMove={handleInteractivePointerMove}
                onPointerLeave={handleInteractivePointerLeave}
              >
                {isSending ? <LoaderCircle className="spin-icon" size={18} /> : <Send size={18} />}
                {isSending ? "Sending..." : "Send Message"}
              </button>
              {formStatus ? <p className="form-status">{formStatus}</p> : null}
            </form>
          </div>
        </div>
      </section>

      <button
        className={`back-to-top ${showTopButton ? "is-visible" : ""}`}
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        onPointerMove={handleInteractivePointerMove}
        onPointerLeave={handleInteractivePointerLeave}
      >
        <ArrowUp size={20} />
      </button>

      <footer className="site-footer">
        <p>&copy; 2026 {profile.name}. All rights reserved. Built with Next.js, TypeScript, GSAP, and Lenis.</p>
      </footer>

      {notification ? (
        <div className="notification-layer" role="status" aria-live="polite">
          <div className={`notification-card ${notification.type}`}>
            <span className="notification-icon" aria-hidden="true">
              {notification.type === "success" ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
            </span>
            <div>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
            </div>
            <button
              type="button"
              className="notification-close"
              onClick={() => setNotification(null)}
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
