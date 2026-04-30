"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Lightbulb,
  ListChecks,
  Rocket,
} from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { useMagicBento } from "@/components/useMagicBento";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectDetailClient({ project }: { project: Project }) {
  const pageRef = useRef<HTMLElement>(null);
  const otherProjects = projects.filter((item) => item.slug !== project.slug);

  useMagicBento(pageRef);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        return;
      }

      gsap.from(".project-hero-copy > *, .project-hero-image", {
        autoAlpha: 0,
        y: 34,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".project-detail-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          }
        );
      });
    },
    { scope: pageRef }
  );

  return (
    <main className="project-page" ref={pageRef}>
      <section className="project-hero">
        <div className="project-hero-copy">
          <Link className="back-link" href="/#projects">
            <ArrowLeft size={17} />
            Back to Projects
          </Link>
          <span className="eyebrow">{project.eyebrow}</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="project-actions">
            <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={18} />
              Live Project
            </a>
            <a className="btn btn-secondary" href={project.githubUrl} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub Client
            </a>
          </div>
        </div>
        <Image
          className="project-hero-image"
          src={project.image}
          alt={`${project.title} preview`}
          width={1600}
          height={1000}
          priority
        />
      </section>

      <section className="project-content section">
        <div className="section-inner">
          <div className="project-meta-grid magic-bento-grid">
            <article className="project-detail-reveal magic-bento-card">
              <h2>Main Technology Stack</h2>
              <div className="badge-list">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
            <article className="project-detail-reveal magic-bento-card">
              <h2>Brief Description</h2>
              <p>{project.description}</p>
            </article>
          </div>

          <div className="detail-grid magic-bento-grid">
            <DetailBlock icon={ListChecks} title="Key Highlights" items={project.highlights} />
            <DetailBlock icon={Lightbulb} title="Challenges Faced" items={project.challenges} />
            <DetailBlock icon={Rocket} title="Future Improvements" items={project.future} />
          </div>

          <div className="next-projects project-detail-reveal">
            <h2>More Projects</h2>
            <div className="next-project-grid magic-bento-grid">
              {otherProjects.map((item) => (
                <Link className="next-project magic-bento-card" href={`/projects/${item.slug}`} key={item.slug}>
                  <Image src={item.image} alt={`${item.title} preview`} width={1600} height={1000} />
                  <span>{item.title}</span>
                  <ArrowRight size={17} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  return (
    <article className="detail-block project-detail-reveal magic-bento-card">
      <div className="card-heading">
        <span className="icon-box">
          <Icon size={21} />
        </span>
        <h2>{title}</h2>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
