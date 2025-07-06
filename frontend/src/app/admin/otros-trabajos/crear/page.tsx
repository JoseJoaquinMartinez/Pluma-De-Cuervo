import { SectionComponent } from "@/homepage/components/SectionComponent";
import { OtherWorkAdminComponent } from "@/other-works/components/OtherWorkAdminComponent";

export default function CreateOtherWorkPage() {
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Crear otro trabajo"
        content={<OtherWorkAdminComponent />}
      />
    </div>
  );
}
