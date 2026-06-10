"use client";

import { useEffect, useRef } from "react";

import styles from "./SkillRadarChart.module.scss";

interface Skill {
  name: string;
  mastered: number;
  developing: number;
  maxValue: number;
}

interface SkillRadarChartProps {
  skills: Skill[];
  title: string;
  description: string;
}

/* LCD phosphor palette (console tokens, design.md §5.10):
   mastered = bright mint, developing = dim mint. */
const GRID = "rgba(118, 210, 182, 0.12)";
const LABEL = "rgba(118, 210, 182, 0.75)";
const MASTERED_STROKE = "rgba(118, 210, 182, 0.85)";
const MASTERED_FILL = "rgba(118, 210, 182, 0.18)";
const MASTERED_POINT = "rgba(118, 210, 182, 1)";
const DEVELOPING_STROKE = "rgba(62, 110, 94, 0.9)";
const DEVELOPING_FILL = "rgba(62, 110, 94, 0.15)";
const DEVELOPING_POINT = "rgba(62, 110, 94, 1)";

export default function SkillRadarChart({
  skills,
  title,
  description,
}: SkillRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 80;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set styles
    ctx.strokeStyle = GRID;
    ctx.lineWidth = 1;

    // Draw concentric circles (grid)
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw axes
    const angleStep = (2 * Math.PI) / skills.length;
    ctx.strokeStyle = GRID;

    for (let i = 0; i < skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Draw skill labels
    ctx.fillStyle = LABEL;
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const labelRadius = radius + 30;
      const x = centerX + Math.cos(angle) * labelRadius;
      const y = centerY + Math.sin(angle) * labelRadius;

      // Split long labels into multiple lines
      const words = skills[i].name.split(" ");
      if (words.length > 1 && skills[i].name.length > 12) {
        ctx.fillText(words[0], x, y - 8);
        ctx.fillText(words.slice(1).join(" "), x, y + 8);
      } else {
        ctx.fillText(skills[i].name, x, y);
      }
    }

    // Draw mastered skills area (bright mint)
    ctx.beginPath();
    ctx.strokeStyle = MASTERED_STROKE;
    ctx.fillStyle = MASTERED_FILL;
    ctx.lineWidth = 2;

    for (let i = 0; i < skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const skillRadius = (radius * skills[i].mastered) / skills[i].maxValue;
      const x = centerX + Math.cos(angle) * skillRadius;
      const y = centerY + Math.sin(angle) * skillRadius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw developing skills area (dim mint)
    ctx.beginPath();
    ctx.strokeStyle = DEVELOPING_STROKE;
    ctx.fillStyle = DEVELOPING_FILL;
    ctx.lineWidth = 2;

    for (let i = 0; i < skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const skillRadius = (radius * skills[i].developing) / skills[i].maxValue;
      const x = centerX + Math.cos(angle) * skillRadius;
      const y = centerY + Math.sin(angle) * skillRadius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw skill points
    for (let i = 0; i < skills.length; i++) {
      const angle = i * angleStep - Math.PI / 2;

      // Mastered skill point
      const masteredRadius = (radius * skills[i].mastered) / skills[i].maxValue;
      const masteredX = centerX + Math.cos(angle) * masteredRadius;
      const masteredY = centerY + Math.sin(angle) * masteredRadius;

      ctx.beginPath();
      ctx.arc(masteredX, masteredY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = MASTERED_POINT;
      ctx.fill();

      // Developing skill point
      const developingRadius =
        (radius * skills[i].developing) / skills[i].maxValue;
      const developingX = centerX + Math.cos(angle) * developingRadius;
      const developingY = centerY + Math.sin(angle) * developingRadius;

      ctx.beginPath();
      ctx.arc(developingX, developingY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = DEVELOPING_POINT;
      ctx.fill();
    }
  }, [skills]);

  return (
    <div className={styles.chart}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className={styles.canvas}
        />

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.dotMastered} />
            <span className={styles.legendMastered}>Mastered</span>
          </span>
          <span className={styles.legendItem}>
            <span className={styles.dotDeveloping} />
            <span className={styles.legendDeveloping}>Developing</span>
          </span>
        </div>
      </div>
    </div>
  );
}
