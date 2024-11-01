import omniCeniza from "../../../../public/home-imagens/OMNI CENIZAS.webp";

export interface OtherWorkProps {
  title: string;
  text: string;
  buttonLink: string;
  buttonText: string;
  imagenSrc: string;
}

export const otherWorks: OtherWorkProps[] = [
  {
    title: "OMNI: CENIZAS",
    text: "'Omni: Cenizas' nos cuenta el auge de un dios. Cómo un hombre normal, Diego, llega a convertirse en un tirano, esclavizando a todo un mundo que resurge de sus cenizas, y a un elenco de personajes que ansían, por encima de todas las cosas, una libertad que jamás han conocido. La historia se va desenvolviendo entre el pasado y el presente, utilizando la ciencia-ficción para justificar los elementos fantásticos en una aventura que trata temas como la pérdida, la desesperanza, la locura, la tiranía o la libertad. Esta novela busca romper con los elementos más tradicionales de la fantasía y con la aparente infalibilidad de los protagonistas que encontramos en muchas obras; nadie es perfecto y queda a la vista desde el primer momento, la esperanza es un lujo que no todos pueden permitirse, y la alegría es algo que se perdió hace milenios.",
    buttonLink:
      "https://www.amazon.es/Omni-cenizas-Gabriel-Pastor-S%C3%A1nchez/dp/8412128796",
    buttonText: "Comprar",
    imagenSrc: "/home-imagens/OMNI CENIZAS.webp",
  },
];
