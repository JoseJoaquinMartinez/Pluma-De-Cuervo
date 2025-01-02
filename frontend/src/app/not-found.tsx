import React from 'react';

import MainButton from "@/components/shared/mainButton";

export default function Custom404() {
    return (
        <section className="global mt-10 bg-background flex flex-col items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                {/* Custom Coffee Cup Icon */}
                <div className="mb-8 relative">
                    {/* Steam dots */}
                    <div className="flex justify-center gap-1 mb-1">
                        <div className="w-2 h-2 rounded-full bg-bordesDecor"></div>
                        <div className="w-2 h-2 rounded-full bg-bordesDecor"></div>
                        <div className="w-2 h-2 rounded-full bg-bordesDecor"></div>
                    </div>
                    {/* Cup */}
                    <div className="relative inline-block w-20 h-20 ">
                        <div className="absolute inset-0">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full ">
                                <path
                                    d="M3 8h18v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"
                                    fill="currentColor"
                                    className="text-botones"
                                />
                                <path
                                    d="M21 8h2a1 1 0 011 1v2a1 1 0 01-1 1h-2V8z"
                                    fill="currentColor"
                                    className="text-botones"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-9xl font-bold text-encabezados mb-4">404</h1>

                {/* Error Messages */}
                <h2 className="text-2xl font-semibold text-mainText mb-4">
                    Oops! Página no encontrada
                </h2>
                <p className="text-lg text-botonesSecundarios mb-8">
                    Parece que te has perdido en el mundo digital. ¿Quizás necesitas otro café?
                </p>

                {/* Return Home Button */}
                <MainButton name={"Volver al inicio"} link={"/"} />

            </div>
        </section>
    );
}

