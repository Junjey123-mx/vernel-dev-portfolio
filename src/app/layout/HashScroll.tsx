import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HashScroll() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const element = document.getElementById(hash.slice(1));

    if (!element) {
      return;
    }

    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash, key]);

  return null;
}
