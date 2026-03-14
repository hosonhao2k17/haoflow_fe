/**
 * Theme – màu sắc & token dùng chung trong dự án.
 * Giá trị thật (oklch) nằm trong app/globals.css (:root và .dark).
 * Dùng constant này để: inline style, Recharts, hoặc chỗ cần chuỗi var(--xxx).
 */

const varRef = (name: string) => `var(${name})`;

/** Tên biến CSS trong globals.css (để dùng trong style / chart) */
export const themeVar = {
  background: varRef("--background"),
  foreground: varRef("--foreground"),
  card: varRef("--card"),
  cardForeground: varRef("--card-foreground"),
  popover: varRef("--popover"),
  popoverForeground: varRef("--popover-foreground"),
  primary: varRef("--primary"),
  primaryForeground: varRef("--primary-foreground"),
  secondary: varRef("--secondary"),
  secondaryForeground: varRef("--secondary-foreground"),
  muted: varRef("--muted"),
  mutedForeground: varRef("--muted-foreground"),
  accent: varRef("--accent"),
  accentForeground: varRef("--accent-foreground"),
  destructive: varRef("--destructive"),
  border: varRef("--border"),
  input: varRef("--input"),
  ring: varRef("--ring"),
  /** Chart 1–5 (dùng cho biểu đồ) */
  chart1: varRef("--chart-1"),
  chart2: varRef("--chart-2"),
  chart3: varRef("--chart-3"),
  chart4: varRef("--chart-4"),
  chart5: varRef("--chart-5"),
  sidebar: varRef("--sidebar"),
  sidebarForeground: varRef("--sidebar-foreground"),
  sidebarPrimary: varRef("--sidebar-primary"),
  sidebarPrimaryForeground: varRef("--sidebar-primary-foreground"),
  sidebarBorder: varRef("--sidebar-border"),
} as const;

/**
 * Màu cho biểu đồ (Recharts) & style inline.
 * Dự án dùng oklch trong globals.css → dùng var(--primary) hoặc color-mix.
 */
export const chartColors = {
  primary: themeVar.primary,
  primaryLight: "color-mix(in oklch, var(--primary) 40%, transparent)",
  primaryLighter: "color-mix(in oklch, var(--primary) 25%, transparent)",
  primaryLightest: "color-mix(in oklch, var(--primary) 20%, transparent)",
  muted: themeVar.muted,
  mutedAlpha: "color-mix(in oklch, var(--muted) 50%, transparent)",
  mutedForeground: themeVar.mutedForeground,
  series: [themeVar.chart1, themeVar.chart2, themeVar.chart3, themeVar.chart4, themeVar.chart5] as const,
} as const;

/**
 * Shadow / glow dùng primary (ví dụ: nút, card nổi bật).
 * Dùng trong style={{ boxShadow: themeShadow.primaryGlow }}
 */
export const themeShadow = {
  primaryGlow: "0 0 20px color-mix(in oklch, var(--primary) 30%, transparent)",
  primaryGlowSm: "0 0 6px var(--primary)",
} as const;
