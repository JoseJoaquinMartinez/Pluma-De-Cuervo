import BlogComponent from "@/homepage/blogs/blogComponent";

import { SectionComponent } from "@/homepage/components/SectionComponent";
import HeroGrid from "@/homepage/bento-section/HeroGrid";

import { OtherWorkComponent } from "@/homepage/other-works/OtherWorkComponent";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <HeroGrid />
      <SectionComponent title="Otras Obras" content={<OtherWorkComponent />} />

      <SectionComponent
        title="Noticias & Pensamientos"
        content={<BlogComponent />}
      />
    </div>
  );
}
