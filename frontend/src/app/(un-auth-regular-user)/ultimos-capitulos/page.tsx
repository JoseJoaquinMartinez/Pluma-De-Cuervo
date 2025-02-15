import { SectionComponent } from "@/homepage/components/SectionComponent";
import LastTenChapters from "./LastTenChapters";
export default function UltimosCapitulos() {
  //TODO AÑADIR EL TITULO DEL LIBRO AL QUE PERTENECE EL CAPITULO EN LA CARD
  return (
    <div className="flex flex-col items-center justify-center pb-8 px-4">
      <SectionComponent
        title="Últimos Capítulos"
        content={<LastTenChapters />}
      />
    </div>
  );
}
