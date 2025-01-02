"use client"
import React from 'react';
import RegistrationComponent from "@/app/authComponents/singup/RegistrationComponent";
import {useSearchParams} from "next/navigation";

export default function SingUpConfirmationPage() {
    const params = useSearchParams();
    const token = params.get("token");

    if(token){
        return (
            <RegistrationComponent token={token}/>
        );
    }
}
