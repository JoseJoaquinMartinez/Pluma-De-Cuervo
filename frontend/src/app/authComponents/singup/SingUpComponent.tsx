import { SINGUPFIELDS } from "../data/singup";
import { FormComponent } from "./components/FormComponent";

export default function SingUpComponent() {
  return (
    <FormComponent
      title={"Crea un nuevo usuario"}
      formFieldsData={SINGUPFIELDS}
    />
  );
}
