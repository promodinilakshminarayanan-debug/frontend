/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1229",
        surface: "#161A3A",
        surfaceHigh: "#1E2350",
        edge: "#2A2F63",
        mist: "#9AA0C7",
        paper: "#F1F2FA",
        gain: "#2DD4BF",
        loss: "#FB7185",
        signal: "#FBBF24",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        flashGain: {
          "0%": { backgroundColor: "rgba(45, 212, 191, 0.35)" },
          "100%": { backgroundColor: "transparent" },
        },
        flashLoss: {
          "0%": { backgroundColor: "rgba(251, 113, 133, 0.35)" },
          "100%": { backgroundColor: "transparent" },
        },
        riseIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        flashGain: "flashGain 900ms ease-out",
        flashLoss: "flashLoss 900ms ease-out",
        riseIn: "riseIn 320ms ease-out",
      },
    },
  },
  plugins: [],
};
