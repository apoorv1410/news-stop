import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      theme: {
        extend: {
          colors: {
            'yellow-100': '#F3DFC1',
            'yellow-200': '#F3CEA1'
          },
        },
      }
    }
  },
  plugins: [nextui()],
  darkMode: "class",
  important: true
};
export default config;
