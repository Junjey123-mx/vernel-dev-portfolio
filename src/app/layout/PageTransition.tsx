import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Forces a full remount of page content on every navigation via location.key
 * (unique per navigation event). Individual page elements handle their own
 * staggered entry animations — this component only provides the remount trigger.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const { key } = useLocation();
  return (
    <div className="page-transition" key={key}>
      {children}
    </div>
  );
}
