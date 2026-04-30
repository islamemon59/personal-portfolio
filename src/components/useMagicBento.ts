"use client";

import { useEffect, type RefObject } from "react";

const CARD_SELECTOR = [
  ".magic-bento-card",
  ".hero-stats > div",
  ".skill-card",
  ".experience-card",
  ".project-card",
  ".timeline-item",
  ".text-panel",
  ".focus-lab",
  ".contact-form",
  ".contact-list",
  ".detail-block",
  ".project-meta-grid article",
  ".next-project",
].join(", ");

const GRID_SELECTOR = [
  ".magic-bento-grid",
  ".about-grid",
  ".skills-grid",
  ".experience-grid",
  ".projects-grid",
  ".contact-grid",
  ".project-meta-grid",
  ".detail-grid",
  ".next-project-grid",
].join(", ");

function setGlowPosition(card: HTMLElement, event: PointerEvent) {
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  card.style.setProperty("--bento-glow-x", `${x}%`);
  card.style.setProperty("--bento-glow-y", `${y}%`);
  card.style.setProperty("--bento-glow-intensity", "1");
  card.style.setProperty("--bento-glow-radius", `${Math.max(rect.width, rect.height) * 0.72}px`);
}

function setGridSpotlight(grid: HTMLElement, event: PointerEvent) {
  const rect = grid.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  grid.style.setProperty("--bento-spotlight-x", `${x}%`);
  grid.style.setProperty("--bento-spotlight-y", `${y}%`);
  grid.style.setProperty("--bento-spotlight-opacity", "1");
  grid.classList.add("is-bento-lit");
}

function clearCard(card: HTMLElement | null) {
  if (!card) {
    return;
  }

  card.style.setProperty("--bento-glow-intensity", "0");
  card.classList.remove("is-bento-active");
}

function clearGrid(grid: HTMLElement | null) {
  if (!grid) {
    return;
  }

  grid.style.setProperty("--bento-spotlight-opacity", "0");
  grid.classList.remove("is-bento-lit");
}

function spawnParticles(card: HTMLElement, event: PointerEvent, count = 7) {
  if (card.querySelectorAll(".bento-particle").length > 14) {
    return;
  }

  const rect = card.getBoundingClientRect();
  const originX = event.clientX - rect.left;
  const originY = event.clientY - rect.top;

  Array.from({ length: count }).forEach((_, index) => {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.42;
    const distance = 28 + Math.random() * 58;
    const size = 3 + Math.random() * 3;

    particle.className = "bento-particle";
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--particle-delay", `${index * 18}ms`);

    card.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  });
}

export function useMagicBento(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || reduceMotion) {
      return undefined;
    }

    let activeCard: HTMLElement | null = null;
    let activeGrid: HTMLElement | null = null;

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const grid = target.closest(GRID_SELECTOR) as HTMLElement | null;
      const card = target.closest(CARD_SELECTOR) as HTMLElement | null;

      if (grid && root.contains(grid)) {
        if (activeGrid !== grid) {
          clearGrid(activeGrid);
          activeGrid = grid;
        }

        setGridSpotlight(grid, event);
      } else {
        clearGrid(activeGrid);
        activeGrid = null;
      }

      if (card && root.contains(card)) {
        if (activeCard !== card) {
          clearCard(activeCard);
          activeCard = card;
          card.classList.add("is-bento-active");
          spawnParticles(card, event);
        }

        setGlowPosition(card, event);
      } else {
        clearCard(activeCard);
        activeCard = null;
      }
    };

    const handleClick = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const card = target.closest(CARD_SELECTOR) as HTMLElement | null;

      if (card && root.contains(card)) {
        spawnParticles(card, event, 10);
      }
    };

    const handlePointerLeave = () => {
      clearCard(activeCard);
      clearGrid(activeGrid);
      activeCard = null;
      activeGrid = null;
    };

    root.addEventListener("pointermove", handlePointerMove);
    root.addEventListener("click", handleClick);
    root.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("click", handleClick);
      root.removeEventListener("pointerleave", handlePointerLeave);
      root.querySelectorAll(".bento-particle").forEach((particle) => particle.remove());
    };
  }, [rootRef]);
}
