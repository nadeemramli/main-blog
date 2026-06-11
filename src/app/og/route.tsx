import { ImageResponse } from "next/og";
import { person } from "@/app/resources/content";

export const runtime = "edge";

/* Operator Console OG card: cream field, one raised panel, dark LCD strip
   with the mint title, silkscreen metadata row. Colors mirror the console
   tokens (the edge runtime can't read CSS custom properties). */
const COLORS = {
  bg: "#D5D2C6",
  panel: "#E4E1D6",
  panelShadow: "0 24px 80px rgba(123, 119, 105, 0.45)",
  lcdBezel: "#1C1D1A",
  lcd: "#0E0F0D",
  mint: "#76D2B6",
  lcdDim: "#3E6E5E",
  ink: "#111827",
  inkTertiary: "#8A877C",
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Operator Console";
  const font = fetch(new URL("../../../public/fonts/Inter.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.bg,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "84%",
            borderRadius: 80,
            background: COLORS.panel,
            boxShadow: COLORS.panelShadow,
            padding: 64,
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 40,
              background: COLORS.lcdBezel,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 28,
                background: COLORS.lcd,
                padding: "56px 64px",
                gap: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: COLORS.lcdDim,
                  fontSize: 26,
                  letterSpacing: "0.2em",
                }}
              >
                <span>NODE-NR.01</span>
                <span>● SYNC</span>
              </div>
              <span
                style={{
                  fontSize: 92,
                  lineHeight: 1.1,
                  color: COLORS.mint,
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {title}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: COLORS.inkTertiary,
              fontSize: 28,
              letterSpacing: "0.18em",
            }}
          >
            <span style={{ color: COLORS.ink }}>
              {person.name.toUpperCase()}
            </span>
            <span>OPERATOR CONSOLE — {person.location.toUpperCase()}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
