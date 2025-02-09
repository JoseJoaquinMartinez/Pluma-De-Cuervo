import { SectionComponent } from "@/homepage/components/SectionComponent";
import { PrivacypolicyComponent } from "@/legal/privacy-policy/PrivacypolicyComponent";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Política de Privacidad"
        content={<PrivacypolicyComponent />}
      />
    </div>
  );
}
