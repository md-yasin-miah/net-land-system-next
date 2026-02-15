"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" className="bg-transparent hover:bg-transparent" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {/* rotation animation on change of theme */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === "light" ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {theme === "light" ? <Sun className="size-5 text-yellow-500" /> : <Moon className="size-5" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
