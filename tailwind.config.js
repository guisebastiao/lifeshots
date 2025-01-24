/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        "media-370": "370px",
        "media-448": "448px",
        "h-caroseul-800": { raw: "(max-height: 800px)" },
        "h-caroseul-700": { raw: "(max-height: 700px)" },
        "h-caroseul-630": { raw: "(max-height: 630px)" },
        "h-caroseul-565": { raw: "(max-height: 565px)" },
      },
      height: {
        container: "calc(100% - 48px - 56px)",
        "container-tabs": "calc(100% - 36px)",
      },
      animation: {
        like: "like 400ms ease-in-out",
        deslike: "deslike 400ms ease-in-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right, #FF512F, #F09819)",
        "gradient-opacity":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
      },
      colors: {
        "red-transparent": "rgba(239, 68, 68, 0.1)",
        "primary-theme": "#FF512F",
        "secondary-theme": "#F09819",
        "primary-theme-hover": "#ff3f19",
        "transparent-color": "rgba(0, 0, 0, 0.5)",
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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
