import React from 'react';
import MainButton from "@/components/shared/mainButton";
import { Mail, AlertCircle } from 'lucide-react';

export default function EmailValidationComponent() {
    return (
        <section className="flex items-center justify-center bg-background">
            <article className="max-w-md w-full bg-cardsBackground p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <Mail className="mx-auto h-16 w-16 text-encabezados" />
                    <h2 className="mt-4 text-3xl font-bold text-encabezados">Verifica tu correo</h2>
                </div>
                <p className="text-mainText text-lg mb-4 text-center">
                    Email enviado, verifica tu bandeja de entrada y sigue los pasos indicados
                </p>
                <article className="bg-commentBackground border-l-4 border-botonesSecundarios p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-botonesSecundarios" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-mainText">
                                Si no aparece en tu bandeja de entrada revisa el spam
                            </p>
                        </div>
                    </div>
                </article>
                <div className="mt-8 flex justify-center">
                    <MainButton name={"Volver"} link={"/auth/singup"} />
                </div>
            </article>
        </section>
    );
}
