import BlogComponent from "@/homepage/blogs/blogComponent";
import { otherWorks } from "@/homepage/other-works/data/otherWorkData";
import { SectionComponent } from "@/homepage/components/SectionComponent";
import HeroGrid from "@/homepage/bento-section/HeroGrid";
import OtherWorksCard from "@/homepage/other-works/OtherWorkCard";
//TODO add loader in case the fetch is slow or a 404 component incase
export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <HeroGrid />
      <SectionComponent
        title="Otras Obras"
        content={
          <>
            {otherWorks.map((work) => (
              <OtherWorksCard key={work.title} {...work} />
            ))}
          </>
        }
      />

      <SectionComponent
        title="Noticias & Pensamientos"
        content={<BlogComponent />}
      />
    </div>
  );
}
