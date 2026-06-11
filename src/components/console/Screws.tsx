import styles from "./Screws.module.scss";

/** A pair of slotted mounting screws in the shell's top corners.
 *  Counts as the shell's one decorative detail (design.md §4). */
export const Screws = () => (
  <>
    <span className={`${styles.screw} ${styles.tl}`} aria-hidden="true" />
    <span className={`${styles.screw} ${styles.tr}`} aria-hidden="true" />
  </>
);
