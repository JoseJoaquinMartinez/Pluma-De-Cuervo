import HeroGrid from "@/components/bento-section/HeroGrid";
import { SectionComponent } from "@/homepage/components/SectionComponent";
import { OtherWorksCard } from "@/homepage/other-works/OtherWorkCard";
import { otherWorks } from "@/homepage/other-works/data/otherWorkData";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroGrid />
      <SectionComponent
        title="Otras Obras"
        content={
          <>
            {otherWorks.map((work) => {
              <OtherWorksCard key={work.title} {...work} />;
            })}
          </>
        }
      />
    </div>
  );
}
