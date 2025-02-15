import { SectionComponent } from "@/homepage/components/SectionComponent";
import { LegalAdviceComponent } from "@/legal/aviso-legal/LegalAdviceComponent";

export default function LegalAdvicePage() {
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Aviso Legal"
        content={<LegalAdviceComponent />}
      />
    </div>
  );
}
