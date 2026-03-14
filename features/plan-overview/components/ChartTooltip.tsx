"use client";

type TooltipPayload = { name: string; value: number; fill?: string; color?: string }[];

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string;
}

export default function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: p.fill || p.color }}
          />
          {p.name}: <span className="font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
