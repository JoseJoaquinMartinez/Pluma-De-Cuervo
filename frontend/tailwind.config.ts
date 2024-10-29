// tailwind.config.ts
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
        encabezados: "#9C1209",
        botonesSecundarios: "#A3504B",
        botones: "#C27A6D",
        navBarActiveLink: "#E57373",
        bordesDecor: "#8C4F40",
        navFoot: "#554039",
        whiteText: "#F5F5F5",
        mainText: "#4A4A4A",
        commentBackground: "#FBEAEF",
        background: "#B8A79D",
        cardsBackground: "#DCD4CC",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".grid-template-desktop": {
            display: "grid",
            gridTemplateAreas: `
              "plumaDeCuervo  sobreElAutor sobreElAutor"
              "ultimosCapitulos sobreElAutor sobreElAutor" 
              "newsletter newsletter newsletter"
            `,
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows:
              "minmax(150px, auto) minmax(200px, auto) minmax(100px, auto)",
          },
          ".grid-template-mobile": {
            display: "grid",
            gridTemplateAreas: `
              "plumaDeCuervo"
              "sobreElAutor"
              "ultimosCapitulos"
              "newsletter"
            `,
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto",
          },
        },
        ["responsive"]
      );
    },
  ],
};

export default config;
