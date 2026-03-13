import { useState, useRef, useEffect, ViewTransitionPseudoElement } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_CATEGORIES = {
  "Smileys": ["😀","😂","😍","🥰","😎","🤩","😴","🥳","😇","🤔","😤","🥺","😱","🤯","😈","💀","👻","🤖","💩","🎭"],
  "Finance": ["💰","💵","💴","💶","💷","💸","💳","🪙","💹","📈","📉","🏦","🤑","💎","🏧","💱","📊","🧾","💼","🪝"],
  "Food": ["🍔","🍕","🍜","🍣","🍦","🍩","🥗","🍱","🌮","🥪","☕","🧃","🥤","🍺","🍷","🥂","🍾","🧁","🍰","🎂"],
  "Transport": ["🚗","✈️","🚂","🚢","🚁","🛵","🚲","🚕","🏎️","🚌","🛺","⛵","🚤","🛸","🚀","🛻","🚙","🏍️","🚑","🚒"],
  "Home": ["🏠","🏡","🛋️","🛏️","🪑","🚿","🛁","🪴","🪟","🚪","🪣","🧹","🧺","🪞","🛗","💡","🔌","📺","🖥️","📷"],
  "Health": ["💊","🏥","🩺","🩹","🧬","🔬","🩻","🧪","💉","🫀","🦷","👁️","🧠","🫁","🦴","🩸","🏋️","🧘","🤸","🚴"],
  "Fun": ["🎮","🎬","🎵","🎸","🎹","🎯","🎲","♟️","🎳","🎻","🥁","🎤","🎧","🎨","🖌️","🎭","🎪","🎠","🎡","🎢"],
  "Nature": ["🌿","🌸","🌻","🍀","🌳","🌊","🔥","⭐","🌙","☀️","🌈","❄️","🍂","🌺","🌴","🦋","🐾","🌾","🍁","🪨"],
  "Objects": ["📱","💻","⌚","📚","🔑","🎁","✏️","📌","🔒","💡","🔧","🪛","🧲","📡","🔭","🧭","⏰","📦","🗂️","📎"],
  "Symbols": ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","♾️","✅","❌","⚡","🔥","💫","✨","🎉","🏆","🥇","🎖️"],
};

const ALL_ICONS = Object.values(ICON_CATEGORIES).flat();


interface Props {
    value: string;
    onChange: (val: string) => void;
}

const IconPicker = ({ value, onChange }: Props) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Smileys");
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 100);
    }, [open]);

    const searchResults = search.trim()
        ? ALL_ICONS.filter((_, i) => {
            return true;
        }).filter((icon) => {
            const q = search.toLowerCase();
            return Object.entries(ICON_CATEGORIES).some(([cat, icons]) =>
            icons.includes(icon) && cat.toLowerCase().includes(q)
            ) || icon.includes(q);
        })
        : null;

    const displayed = searchResults ?? ICON_CATEGORIES[activeTab as keyof typeof ICON_CATEGORIES] ?? [];

    return (
        <Popover open={open} onOpenChange={setOpen}>
        {/* ── Trigger input ── */}
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
            {value ? (
                <span className="text-xl leading-none">{value}</span>
            ) : (
                <Smile className="w-4 h-4 text-muted-foreground/50 shrink-0" />
            )}
            <span className={cn("text-sm flex-1", value ? "text-foreground" : "text-muted-foreground/50")}>
                {value ? "Icon selected" : "Pick an icon..."}
            </span>
            {value && (
                <span
                role="button"
                onClick={(e) => { e.stopPropagation(); onChange?.(""); }}
                className="text-muted-foreground/40 hover:text-muted-foreground text-xs px-1 rounded transition-colors"
                >
                ✕
                </span>
            )}
            </button>
        </PopoverTrigger>

        {/* ── Popover panel ── */}
        <PopoverContent
            side="bottom"
            align="start"
            sideOffset={8}
            className="w-[320px] p-0 rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
        >
            {/* Search */}
            <div className="p-3 border-b border-border/50">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
                <Input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm icon phù hợp..."
                className="pl-8 h-8 rounded-lg text-sm bg-muted/60 border-border/50 focus-visible:ring-violet-500/30 focus-visible:border-violet-500/50 placeholder:text-muted-foreground/40"
                />
            </div>
            </div>

            {/* Category tabs */}
            {!search && (
                <div className="border-b border-border/50 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="flex gap-0.5 p-2 w-max">
                    {Object.keys(ICON_CATEGORIES).map((cat) => (
                        <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                            "whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0",
                            activeTab === cat
                            ? "bg-violet-500/15 text-violet-400 border border-violet-500/30"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        >
                        {cat}
                        </button>
                    ))}
                    </div>
                </div>
            )}

            {/* Icon grid */}
            <ScrollArea className="h-[220px]">
            <div className="p-3">
                {search && displayed.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[140px] text-muted-foreground/40 gap-2">
                    <Smile className="w-8 h-8" />
                    <span className="text-xs">No icons found</span>
                </div>
                ) : (
                <div className="grid grid-cols-8 gap-1">
                    {displayed.map((icon: string, i: number) => (
                    <button
                        key={`${icon}-${i}`}
                        type="button"
                        onClick={() => { onChange?.(icon); setOpen(false); setSearch(""); }}
                        className={cn(
                        "aspect-square rounded-lg text-lg flex items-center justify-center transition-all",
                        "hover:bg-muted hover:scale-110 active:scale-95",
                        value === icon
                            ? "bg-violet-500/15 ring-1 ring-violet-500/50 scale-105"
                            : "bg-transparent"
                        )}
                    >
                        {icon}
                    </button>
                    ))}
                </div>
                )}
            </div>
            </ScrollArea>

            {/* Footer */}
            {value && (
            <div className="px-4 py-2.5 border-t border-border/50 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                <span className="text-lg">{value}</span>
                <span className="text-xs text-muted-foreground">Selected</span>
                </div>
                <button
                type="button"
                onClick={() => { onChange?.(""); }}
                className="text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                >
                Remove
                </button>
            </div>
            )}
        </PopoverContent>
        </Popover>
    );
};

export default IconPicker;