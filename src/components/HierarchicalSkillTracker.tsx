"use client";

import { useState, useEffect } from "react";
import SkillRadarChart from "./SkillRadarChart";

import styles from "./HierarchicalSkillTracker.module.scss";

interface Skill {
  name: string;
  mastered: number;
  developing: number;
  maxValue: number;
}

interface Cluster {
  name: string;
  mastered: number;
  developing: number;
  maxValue: number;
  fields: Skill[];
}

interface HierarchicalSkillTrackerProps {
  clusters: Cluster[];
  title?: string;
  description?: string;
  approach?: string;
}

// Function to calculate cluster scores from fields
const calculateClusterScores = (clusters: Cluster[]): Cluster[] => {
  return clusters.map((cluster) => {
    const masteredSum = cluster.fields.reduce(
      (sum, field) => sum + field.mastered,
      0
    );
    const developingSum = cluster.fields.reduce(
      (sum, field) => sum + field.developing,
      0
    );
    const fieldCount = cluster.fields.length;

    return {
      ...cluster,
      mastered: Math.round((masteredSum / fieldCount) * 10) / 10,
      developing: Math.round((developingSum / fieldCount) * 10) / 10,
    };
  });
};

// title/description/approach stay in the props contract but render as
// printed ink in the AttributeConsole, not on the glass (design.md §1).
export default function HierarchicalSkillTracker({
  clusters,
}: HierarchicalSkillTrackerProps) {
  const [calculatedClusters, setCalculatedClusters] = useState<Cluster[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [showMainChart, setShowMainChart] = useState(true);

  useEffect(() => {
    setCalculatedClusters(calculateClusterScores(clusters));
  }, [clusters]);

  const handleClusterSelect = (clusterName: string) => {
    setSelectedCluster(selectedCluster === clusterName ? null : clusterName);
    setShowMainChart(selectedCluster === clusterName);
  };

  const selectedClusterData = calculatedClusters.find(
    (c) => c.name === selectedCluster
  );

  return (
    <div className={styles.tracker}>
      {/* Main Cluster Chart */}
      {showMainChart && calculatedClusters.length > 0 && (
        <SkillRadarChart
          skills={calculatedClusters}
          title="Fundamental Skills Overview"
          description="Select a cluster below to explore its sub-skills"
        />
      )}

      {/* Cluster Navigation */}
      <div>
        <div className={styles.navLabel}>Explore Clusters</div>
        <div className={styles.nav}>
          {calculatedClusters.map((cluster) => (
            <button
              key={cluster.name}
              type="button"
              className={
                selectedCluster === cluster.name
                  ? `${styles.clusterButton} ${styles.clusterButtonActive}`
                  : styles.clusterButton
              }
              onClick={() => handleClusterSelect(cluster.name)}
            >
              {cluster.name}
            </button>
          ))}
          {selectedCluster && (
            <button
              type="button"
              className={styles.clusterButton}
              onClick={() => {
                setSelectedCluster(null);
                setShowMainChart(true);
              }}
            >
              Back to Overview
            </button>
          )}
        </div>
      </div>

      {/* Selected Cluster Detail */}
      {selectedCluster && selectedClusterData && (
        <div className={styles.detail}>
          <div className={styles.detailHeader}>
            <h3 className={styles.detailTitle}>{selectedCluster} Deep Dive</h3>
            <p className={styles.detailSub}>
              Overall: mastered {selectedClusterData.mastered}/10 · developing{" "}
              {selectedClusterData.developing}/10
            </p>
          </div>

          <SkillRadarChart
            skills={selectedClusterData.fields}
            title={`${selectedCluster} Skills`}
            description="Individual skill ratings within this cluster"
          />

          {/* Skill Details Table */}
          <div className={styles.table}>
            {selectedClusterData.fields.map((field, index) => (
              <div key={index} className={styles.row}>
                <span className={styles.fieldName}>{field.name}</span>
                <span className={styles.scores}>
                  <span className={styles.mastered}>
                    M {field.mastered}/10
                  </span>
                  <span className={styles.developing}>
                    D {field.developing}/10
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
