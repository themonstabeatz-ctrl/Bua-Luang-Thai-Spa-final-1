import React, { useEffect, useRef, useState } from "react";

const offsetClass = {
  left: "-translate-x-20",
  right: "translate-x-20",
  top: "-translate-y-14",
  bottom: "translate-y-14",
};

/**
 * Animates children sliding in from a given direction whenever the element
 * enters the viewport. Re-triggers if the user scrolls back past it and
 * returns, so the entrance plays both on scroll-down and scroll-up.
 */
export const Reveal = ({
  direction = "left",
  delay = 0,
  duration = 900,
  className = "",
  children,
  as: Tag = "div",
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${className} transition-all ease-out will-change-transform ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${offsetClass[direction]}`
      }`}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};
