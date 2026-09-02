import { Key } from "@/components/console";

import styles from "./ToolsStackGrid.module.scss";

interface ToolCategory {
  category: string;
  tools: string[];
}

interface ToolsStackGridProps {
  categories: ToolCategory[];
}

/* The switchboard (design.md §6.2): recessed category wells holding tool
   chips that are real (decorative) keys — they drift toward the pointer
   like every other free-standing cap. */
export default function ToolsStackGrid({ categories }: ToolsStackGridProps) {
  return (
    <div className={styles.board}>
      {categories.map((cat) => (
        <div key={cat.category} className={styles.well}>
          <span className={styles.label}>{cat.category}</span>
          <div className={styles.chips}>
            {cat.tools.map((tool) => (
              <Key key={tool} as="span" className={styles.chip}>
                {tool}
              </Key>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
