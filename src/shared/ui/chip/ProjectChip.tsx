import styles from "./ProjectChip.module.css";

interface ProjectChipProps {
  label: string;
}

export function ProjectChip({ label }: ProjectChipProps) {
  return <span className={styles.chip}>{label}</span>;
}
