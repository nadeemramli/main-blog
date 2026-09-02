import styles from "./DeviceDock.module.scss";

/* The reference unit as printed ink (design.md §5.13): a line drawing of
   the handheld that sits in the dock before the 3D scene loads, and stays
   there wherever the scene never loads (small viewports, low-tier devices,
   reduced motion, no WebGL). Same silhouette as the three.js model. */
export function DeviceOutline() {
  return (
    <svg
      className={styles.outline}
      viewBox="0 0 120 170"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* body */}
      <rect x="6" y="6" width="108" height="158" rx="14" />
      {/* screen bezel + glass */}
      <rect x="20" y="22" width="80" height="70" rx="6" />
      <rect x="25" y="27" width="70" height="60" rx="3" strokeWidth="0.9" />
      {/* readout */}
      <line x1="32" y1="40" x2="70" y2="40" strokeWidth="2" />
      <line x1="32" y1="48" x2="54" y2="48" strokeWidth="0.9" />
      {/* keycaps */}
      <rect x="22" y="108" width="20" height="14" rx="3" />
      <rect x="50" y="108" width="20" height="14" rx="3" />
      <rect x="78" y="108" width="20" height="14" rx="3" />
      {/* knob */}
      <circle cx="92" cy="144" r="8" />
      <line x1="92" y1="138" x2="92" y2="141" strokeWidth="0.9" />
      {/* grille */}
      <g strokeWidth="0.8">
        <line x1="24" y1="140" x2="24" y2="150" />
        <line x1="30" y1="140" x2="30" y2="150" />
        <line x1="36" y1="140" x2="36" y2="150" />
        <line x1="42" y1="140" x2="42" y2="150" />
      </g>
    </svg>
  );
}
