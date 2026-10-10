import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const START = "top 85%";

// Anima os elementos quando entram na tela ao rolar:
// [data-reveal] sobe com fade; nos [data-reveal-group] os filhos entram um após o outro
function useScrollReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      });

      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        const items = group.children;
        // os cards têm transition de hover no CSS, que deixaria a animação travada
        gsap.set(items, { transition: "none" });
        gsap.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: START, once: true },
          onComplete: () => gsap.set(items, { clearProps: "transition,transform,opacity" }),
        });
      });
    });

    return () => mm.revert();
  }, []);
}

export default useScrollReveal;
