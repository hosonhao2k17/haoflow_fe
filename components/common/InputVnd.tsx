import { ChangeEvent } from "react";
import { Input } from "../ui/input"
import { cn } from "@/lib/utils";

interface Props {
    isPending?: boolean;
    value: number | undefined;
    onChange: (value: number | undefined) => void;
    className?: string;
}

const InputVnd = ({ isPending = false, value, onChange, className }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
        onChange(raw ? Number(raw) : undefined);
    };

    return (
        <Input
            disabled={isPending}
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={value != null ? value.toLocaleString("vi-VN") : ""}
            onChange={handleChange}
            className={
                cn("h-11 rounded-xl border-border/60 text-base font-medium pr-8 shadow-none",className)
            }
        />
    );
};

export default InputVnd;