import {
  Badge,
  Gauge,
  Key,
  Led,
  MicroLcd,
  Panel,
  Screen,
} from "@/components/console";

import { LabRockerDemo } from "./LabRockerDemo";
import styles from "./lab.module.scss";

// TEMP — remove in Phase 5. Component lab for the Operator Console system.
export const metadata = {
  title: "Console Lab",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <div className={styles.desk}>
      <div className={styles.inner}>
        <section>
          <div className={styles.eyebrow}>LAB.01 — PANEL</div>
          <div className={styles.row}>
            <Panel>Default panel — raised device shell.</Panel>
            <Panel interactive>Interactive panel — hover to lift.</Panel>
            <Panel padding="lg">Large padding panel.</Panel>
            <Panel padding="none">
              <div style={{ padding: "12px 20px" }}>Padding none (caller-managed).</div>
            </Panel>
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.02 — SCREEN</div>
          <div className={styles.row}>
            <div className={styles.screenCol}>
              <Screen nodeId="NODE-NR.01" status="sync" scanlines>
                <div className={styles.readoutXl}>NADEEM RAMLI</div>
                <div className={styles.lcdDim}>
                  GROWTH MARKETER · INDIE BUILDER
                </div>
              </Screen>
              <span className={styles.note}>sync + scanlines</span>
            </div>
            <div className={styles.screenCol}>
              <Screen nodeId="NODE-PRJ.04" status="live">
                <div>DEALN — MVP BUILD</div>
                <div className={styles.lcdDim}>TRIALS &amp; FEEDBACK LOOP</div>
              </Screen>
              <span className={styles.note}>live (pulsing dot)</span>
            </div>
            <div className={styles.screenCol}>
              <Screen nodeId="NODE-PRJ.07" status="idle">
                <div>MAXIMAL</div>
                <div className={styles.lcdDim}>PRODUCTIVITY TOOL</div>
              </Screen>
              <span className={styles.note}>idle (mint dot)</span>
            </div>
            <div className={styles.screenCol}>
              <Screen nodeId="NODE-ARC.02" status="off">
                <div className={styles.lcdDim}>NO SIGNAL</div>
              </Screen>
              <span className={styles.note}>off (no dot)</span>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.03 — MICRO LCD</div>
          <div className={styles.row}>
            <MicroLcd>ASIA/KUALA_LUMPUR</MicroLcd>
            <MicroLcd label="LOCAL">00:43:25</MicroLcd>
            <MicroLcd label="YRS EXP">5+</MicroLcd>
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.04 — LED</div>
          <div className={styles.row}>
            <Led color="mint" label="Online" />
            <Led color="red" label="Live" pulse />
            <Led color="red" label="In Development" />
            <Led color="amber" label="Pending" />
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.05 — KEY</div>
          <div className={styles.row}>
            <Key>Read Case Study</Key>
            <Key variant="primary">Schedule a Call</Key>
            <Key variant="icon" aria-label="Next">
              →
            </Key>
            <Key disabled>Disabled</Key>
            <Key href="#lab-href">Href Key</Key>
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.06 — BADGE</div>
          <div className={styles.row}>
            <Badge>Prototype</Badge>
            <Badge led="red">In Development</Badge>
            <Badge led="mint">Live</Badge>
            <Badge led="amber">Pending</Badge>
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.07 — ROCKER</div>
          <div className={styles.row}>
            <LabRockerDemo />
          </div>
        </section>

        <section>
          <div className={styles.eyebrow}>LAB.08 — GAUGE</div>
          <div className={styles.row}>
            <Gauge percent={0} label="Current Focus" value="At Rest" />
            <Gauge percent={35} label="Current Focus" value="Building Dealn" />
            <Gauge percent={70} label="Capacity" value="High Load" />
            <Gauge percent={100} label="Capacity" value="Maxed" />
          </div>
        </section>
      </div>
    </div>
  );
}
