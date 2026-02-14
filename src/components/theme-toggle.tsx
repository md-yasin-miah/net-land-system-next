"use client";

import { useTheme } from "@/components/theme-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <ToggleGroup
        type="single"
        size="sm"
        value={theme}
        onValueChange={(value) => {
          if (value) setTheme(value as "light" | "dark" | "system");
        }}
        className="bg-slate-800 rounded-lg p-1"
      >
        <ToggleGroupItem
          value="light"
          aria-label="Light mode"
          className="data-[state=on]:bg-white data-[state=on]:text-slate-900 text-slate-400 hover:text-white size-8"
        >
          <Sun className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="dark"
          aria-label="Dark mode"
          className="data-[state=on]:bg-white data-[state=on]:text-slate-900 text-slate-400 hover:text-white size-8 group"
        >
          <Moon className="w-4 h-4 group-hover:text-slate-900" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
