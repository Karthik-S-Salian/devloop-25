import { type Config } from "tailwindcss";
import TWA from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        plane: "plane 1s linear infinite",
        slideshow: "slideshow 1s linear infinite;",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundSize: {
        "0-100": "0% 100%",
        "100-0": "100% 0%",
        "25-100": "25% 100%",
        "100-25": "100% 25%",
        "50-100": "50% 100%",
        "100-50": "100% 50%",
        "75-100": "75% 100%",
        "100-75": "100% 75%",
        "100-100": "100% 100%",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        "digital-number": ["Digital Numbers", ...fontFamily.mono],
        "fira-code": ["Fira Code", ...fontFamily.mono],
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        plane: {
          "0%": {
            left: "0%;",
            top: "200px;",
          },
          "20%": {
            left: "25%;",
            top: "150px;",
          },
          "50%": {
            left: "50%;",
            top: "100px;",
          },
          "80%": {
            left: "75%;",
            top: "150px;",
          },
          "100%": {
            left: "100%;",
            top: "200px;",
          },
        },
        slideshow: {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
      transitionDuration: {
        "20s": "20s",
        "30s": "30s",
        "60s": "60s",
        "120s": "120s",
        "240s": "240s",
      },
    },
  },
  plugins: [TWA],
} satisfies Config;
