import { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrameId = 0;

    const updateProgress = () => {
      animationFrameId = 0;

      const documentElement = document.documentElement;
      const maxScroll = documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      progressRef.current?.style.setProperty("--scroll-progress", String(Math.min(Math.max(progress, 0), 1)));
    };

    const requestProgressUpdate = () => {
      if (animationFrameId === 0) {
        animationFrameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true" ref={progressRef}>
      <div className="scroll-progress__track" />
    </div>
  );
}
