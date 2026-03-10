import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Pipette } from "lucide-react";

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#14b8a6", "#f43f5e",
];

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

const ColorPicker = ({ value = "#8b5cf6", onChange }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState(value);

  const isValidHex = (hex: string) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex);

  const handleInputChange = (raw: string) => {
    const val = raw.startsWith("#") ? raw : `#${raw}`;
    setInputVal(val);
    if (isValidHex(val)) onChange?.(val);
  };

  const handlePreset = (color: string) => {
    setInputVal(color);
    onChange?.(color);
  };

  const handleNativeChange = (color: string) => {
    setInputVal(color);
    onChange?.(color);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full flex items-center gap-3 px-3 h-10 rounded-xl border border-border/60",
            "bg-muted/50 hover:bg-muted/80 transition-colors text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40",
            open && "ring-2 ring-violet-500/40 border-violet-500/50"
          )}
        >
          <span
            className="w-5 h-5 rounded-md border border-white/10 shadow-sm shrink-0 transition-all"
            style={{ backgroundColor: isValidHex(value) ? value : "#8b5cf6" }}
          />
          <span className="text-sm text-foreground flex-1 font-mono tracking-wide">
            {isValidHex(value) ? value.toUpperCase() : "Pick a color"}
          </span>
          <Pipette className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
        </button>
      </PopoverTrigger>

      {/* ── Panel ── */}
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="w-[280px] p-4 rounded-2xl border border-border/60 shadow-2xl flex flex-col gap-4"
      >
        {/* Preset swatches */}
        <div className="space-y-2">
          <Label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            Màu có sẵn
          </Label>
          <div className="grid grid-cols-5 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handlePreset(color)}
                className="group relative aspect-square rounded-xl border-2 transition-all hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: color,
                  borderColor: value === color ? "white" : "transparent",
                  boxShadow: value === color ? `0 0 0 1px ${color}` : "none",
                }}
              >
                {value === color && (
                  <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50" />

        {/* Native color picker + hex input */}
        <div className="space-y-2">
          <Label className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            Tùy chỉnh
          </Label>
          <div className="flex items-center gap-2">
            {/* Native picker */}
            <label
              className="relative w-10 h-10 rounded-xl border border-border/60 overflow-hidden cursor-pointer shrink-0 hover:border-border transition-colors"
              style={{ backgroundColor: isValidHex(inputVal) ? inputVal : "#8b5cf6" }}
            >
              <input
                type="color"
                value={isValidHex(inputVal) ? inputVal : "#8b5cf6"}
                onChange={(e) => handleNativeChange(e.target.value)}
                className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
              />
              <Pipette className="absolute inset-0 m-auto w-3.5 h-3.5 text-white/70 pointer-events-none" />
            </label>

            {/* Hex input */}
            <Input
              value={inputVal}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="#000000"
              maxLength={7}
              className="h-10 rounded-xl bg-muted/50 border-border/60 font-mono text-sm tracking-widest uppercase focus-visible:ring-violet-500/30 focus-visible:border-violet-500/50 placeholder:text-muted-foreground/30"
            />
          </div>
        </div>

        {/* Preview */}
        <div
          className="w-full h-10 rounded-xl border border-white/10 transition-all"
          style={{ backgroundColor: isValidHex(inputVal) ? inputVal : "#8b5cf6" }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;