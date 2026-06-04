import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatButton } from "@/components/ChatButton";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Scroll reveal — triggers .reveal → .revealed on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const targets = document.querySelectorAll(".reveal");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  // Custom cursor (desktop only)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);

    // Optional trailing glow
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.width = "30px";
    trail.style.height = "30px";
    document.body.appendChild(trail);

    let trailX = 0, trailY = 0;

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      trailX = e.clientX;
      trailY = e.clientY;
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
    };

    const onOverLink = () => dot.classList.add("hovering");
    const onLeaveLink = () => dot.classList.remove("hovering");

    document.addEventListener("mousemove", onMove);

    // Detect interactive elements for cursor hover
    document.querySelectorAll("a, button, [role='button'], input, select, textarea").forEach((el) => {
      el.addEventListener("mouseenter", onOverLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      dot.remove();
      trail.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <ChatButton />
      <ThemeSwitcher />
    </div>
  );
}
