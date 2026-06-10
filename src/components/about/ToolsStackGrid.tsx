import styles from "./ToolsStackGrid.module.scss";

interface ToolCategory {
  category: string;
  tools: string[];
}

interface ToolsStackGridProps {
  categories: ToolCategory[];
}

export default function ToolsStackGrid({ categories }: ToolsStackGridProps) {
  return (
    <div className={styles.board}>
      {categories.map((cat) => (
        <div key={cat.category} className={styles.well}>
          <span className={styles.label}>{cat.category}</span>
          <div className={styles.chips}>
            {cat.tools.map((tool) => (
              <span key={tool} className={styles.chip}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
