import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/blogs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/books/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/chapters/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/comments/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/otras-obras/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        encabezados: "9C1209",
        botones: "E57373",
        bordesDecor: "8C4F40",
        navFoot: "312420",
        whiteText: "F5F5F5",
        mainText: "4A4A4A",
        commentBackground: "FBEAEF",
        background: "B8A79D",
        cardsBackground: "DCD4CC",
      },
    },
  },
  plugins: [],
};
export default config;
