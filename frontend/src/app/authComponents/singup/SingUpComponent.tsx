"use client";

import {AuthProps, SINGUPFIELDS} from "../data/singup";
import { FormComponent } from "@/app/authComponents/components/FormComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {fetchEmailVerification} from "@/store/slices/auth/singup/thunk/fetchEmailVerification";


const link = "/auth/singup/email-validation";
export default function SingUpComponent() {

    const dispatch = useDispatch<AppDispatch>();
  const {
    data: message, error, loading
  } = useSelector((state: RootState) => state.EmailVerification);
 const handleFetchEmailVerification =
     ({email, password}:AuthProps) => {
    dispatch(fetchEmailVerification({email, password}));
     };



  return (
    <FormComponent
      title={"Crea un nuevo usuario"}
      formFieldsData={SINGUPFIELDS}
      state={message}
      loading={loading}
      error={error}
      link={link}
      dispatch={handleFetchEmailVerification}
      confirmationEmail={true}

    />
  );
}
