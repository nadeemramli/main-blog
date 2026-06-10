"use client";

import { useState } from "react";

import { Key } from "@/components/console";

import styles from "./HowIWorkSteps.module.scss";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: string;
  details?: string[];
}

interface HowIWorkStepsProps {
  steps: Step[];
}

export default function HowIWorkSteps({ steps }: HowIWorkStepsProps) {
  // The sequence rail: the active step's number key is held down.
  const [active, setActive] = useState(1);

  return (
    <div className={styles.steps}>
      {steps.map((step) => (
        <div key={step.number} className={styles.step}>
          <Key
            className={styles.numKey}
            pressed={active === step.number}
            aria-label={`Step ${step.number}: ${step.title}`}
            onClick={() => setActive(step.number)}
          >
            {String(step.number).padStart(2, "0")}
          </Key>
          <div className={styles.body}>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
            {step.details && step.details.length > 0 && (
              <ul className={styles.details}>
                {step.details.map((detail) => (
                  <li key={detail} className={styles.detail}>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
