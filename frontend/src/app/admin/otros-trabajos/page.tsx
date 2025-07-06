import { SectionComponent } from "@/homepage/components/SectionComponent";
import { OtherWorkAdminPageContainer } from "@/other-works/components/OtherWorkAdminPageContainer";

export default function OtherWorksPage() {
  return (
    <div className="flex flex-col  items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Otras obras"
        content={<OtherWorkAdminPageContainer />}
      />
    </div>
  );
}
