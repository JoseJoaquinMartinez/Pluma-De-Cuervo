import { SectionComponent } from "@/homepage/components/SectionComponent";
import { CookiesPolicyComponent } from "@/legal/cookies-policy/CookiesPolicyComponent";

export default function CookiesPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Política de Cookies"
        content={<CookiesPolicyComponent />}
      />
    </div>
  );
}
