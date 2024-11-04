// tailwind.config.ts
import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        encabezados: "#9C1209",
        botonesSecundarios: "#A3504B",
        botones: "#C27A6D",
        navBarActiveLink: "#E57373",
        bordesDecor: "#8C4F40",
        navFoot:
          "#591A06" /* 554039 - color marrón default 591A06  color ladrillo brillante*/,
        whiteText: "#F5F5F5",
        mainText: "#4A4A4A",
        commentBackground: "#FBEAEF",
        background: "#B8A79D",
        cardsBackground: "#DCD4CC",
      },
      screens: {
        mlg: "965px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
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
          ".grid-template-ipad": {
            display: "grid",
            gridTemplateAreas: `
              "plumaDeCuervo  sobreElAutor "
              "ultimosCapitulos sobreElAutor " 
              "newsletter newsletter "
            `,
            gridTemplateColumns: "repeat(2, 1fr)",
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
        {
          respectPrefix: true,
          respectImportant: true,
        }
      );
    },
  ],
};

export default config;
