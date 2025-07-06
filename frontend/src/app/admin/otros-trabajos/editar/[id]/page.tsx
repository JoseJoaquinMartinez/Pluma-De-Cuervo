import { SectionComponent } from "@/homepage/components/SectionComponent";
import { OtherWorkEditPage } from "@/other-works/components/OtherWorkEditPage";

export default function EditOtherWorkPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Editar otro trabajo"
        content={<OtherWorkEditPage id={id} />}
      />
    </div>
  );
}
