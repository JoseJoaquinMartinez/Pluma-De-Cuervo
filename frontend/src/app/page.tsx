import { SectionComponent } from "@/homepage/components/SectionComponent";
import { OtherWorksCard } from "@/homepage/other-works/OtherWorkCard";
import { otherWorks } from "@/homepage/other-works/data/otherWorkData";
import { BlogCard } from "../homepage/blogs/blogCard";
import HeroGrid from "@/components/bento-section/HeroGrid";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
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
      {/* <SectionComponent title="Blogs" content={<BlogCard />} /> */}
    </div>
  );
}
