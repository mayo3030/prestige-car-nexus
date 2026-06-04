import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";

interface Theme {
  name: string;
  enName: string;
  variables: Record<string, string>;
  previewHSL: string;
}

const themes: Theme[] = [
  {
    name: "red",
    enName: "Red",
    previewHSL: "0 75% 52%",
    variables: {
      "--primary": "0 75% 52%",
      "--accent": "0 75% 52%",
      "--ring": "0 75% 52%",
      "--champagne": "0 75% 52%",
      "--champagne-light": "0 75% 65%",
      "--champagne-dark": "0 70% 40%",
      "--gold": "355 70% 45%",
      "--gold-glow-color": "0 75% 55%",
      "--rose-gold": "350 50% 55%",
      "--sidebar-primary": "0 75% 52%",
      "--sidebar-ring": "0 75% 52%",
    },
  },
  {
    name: "champagne",
    enName: "Champagne",
    previewHSL: "35 55% 65%",
    variables: {
      "--primary": "35 55% 65%",
      "--accent": "35 55% 65%",
      "--ring": "35 55% 65%",
      "--champagne": "35 55% 65%",
      "--champagne-light": "35 55% 78%",
      "--champagne-dark": "35 45% 50%",
      "--gold": "40 60% 55%",
      "--gold-glow-color": "40 60% 60%",
      "--rose-gold": "350 30% 60%",
      "--sidebar-primary": "35 55% 65%",
      "--sidebar-ring": "35 55% 65%",
    },
  },
  {
    name: "blue",
    enName: "Blue",
    previewHSL: "215 70% 50%",
    variables: {
      "--primary": "215 70% 50%",
      "--accent": "215 70% 50%",
      "--ring": "215 70% 50%",
      "--champagne": "215 70% 52%",
      "--champagne-light": "215 70% 65%",
      "--champagne-dark": "215 65% 40%",
      "--gold": "220 65% 45%",
      "--gold-glow-color": "215 70% 55%",
      "--rose-gold": "340 30% 55%",
      "--sidebar-primary": "215 70% 50%",
      "--sidebar-ring": "215 70% 50%",
    },
  },
  {
    name: "green",
    enName: "Green",
    previewHSL: "160 60% 45%",
    variables: {
      "--primary": "160 60% 45%",
      "--accent": "160 60% 45%",
      "--ring": "160 60% 45%",
      "--champagne": "160 60% 48%",
      "--champagne-light": "160 60% 62%",
      "--champagne-dark": "160 55% 37%",
      "--gold": "150 55% 40%",
      "--gold-glow-color": "160 60% 50%",
      "--rose-gold": "340 25% 55%",
      "--sidebar-primary": "160 60% 45%",
      "--sidebar-ring": "160 60% 45%",
    },
  },
  {
    name: "purple",
    enName: "Purple",
    previewHSL: "270 60% 55%",
    variables: {
      "--primary": "270 60% 55%",
      "--accent": "270 60% 55%",
      "--ring": "270 60% 55%",
      "--champagne": "270 60% 55%",
      "--champagne-light": "270 60% 68%",
      "--champagne-dark": "270 55% 42%",
      "--gold": "260 55% 45%",
      "--gold-glow-color": "270 60% 58%",
      "--rose-gold": "330 35% 55%",
      "--sidebar-primary": "270 60% 55%",
      "--sidebar-ring": "270 60% 55%",
    },
  },
];

function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(" ").map(Number);
  const sNorm = s / 100;
  const lNorm = l / 100;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const STORAGE_KEY = "jersey-theme";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || "red";
  });

  // Apply active theme on mount (persists across pages)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const theme = themes.find((t) => t.name === saved);
      if (theme) applyTheme(theme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    setActive(theme.name);
    localStorage.setItem(STORAGE_KEY, theme.name);
  };

  const handleSelect = (theme: Theme) => {
    applyTheme(theme);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Color options */}
      {open && (
        <div className="flex flex-col gap-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl">
          {themes.map((theme) => {
            const hex = hslToHex(theme.previewHSL);
            const isActive = active === theme.name;
            return (
              <button
                key={theme.name}
                onClick={() => handleSelect(theme)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 border border-white/20"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <span
                  className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center transition-transform duration-300"
                  style={{ backgroundColor: hex }}
                >
                  {isActive && (
                    <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                  )}
                </span>
                <span className="text-[13px] text-white/80 font-medium whitespace-nowrap">
                  {theme.enName}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
        title="تغيير لون الموقع"
      >
        <Palette className="w-5 h-5 text-white/90" />
      </button>
    </div>
  );
}
