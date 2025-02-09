import React from "react";

export const CookiesPolicyComponent = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-6 text-mainText bg-cardsBackground rounded-lg">
      <h2 className="text-xl font-semibold mt-6 mb-2 text-encabezados">
        1. ¿Qué son las cookies?
      </h2>
      <p>
        Las cookies son pequeños archivos de texto que se almacenan en tu
        dispositivo cuando visitas nuestra web. Se utilizan para mejorar la
        experiencia del usuario y garantizar el correcto funcionamiento del
        sitio.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-encabezados">
        2. Tipos de cookies utilizadas
      </h2>

      <p>En esta web utilizamos las siguientes cookies:</p>
      <ul className="list-disc space-y-2">
        <li className="ml-6">
          <b>Cookies técnicas:</b> Necesarias para el funcionamiento básico del
          sitio. Por ejemplo, la cookie authToken, que se utiliza para
          autenticar a los usuarios logeados. Esta cookie es de sesión, lo que
          significa que caduca al cerrar el navegador o se elimina
          automáticamente cuando el usuario realiza logout.
        </li>
        <li className="ml-6">
          <b>Cookies analíticas:</b> Utilizadas para recopilar información sobre
          el uso del sitio y mejorar su funcionalidad. Estas cookies pueden ser
          propias o de terceros (por ejemplo, Google Analytics).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-encabezados">
        3. Cómo gestionar o deshabilitar las cookies desde el navegador
      </h2>
      <p>
        Puedes configurar tu navegador para aceptar, rechazar o eliminar
        cookies. A continuación, te mostramos cómo hacerlo en algunos
        navegadores comunes:
      </p>
      <ul className="list-disc space-y-2">
        <li className="ml-6">
          <b>Google Chrome: </b>
          {"Configuración > Privacidad y seguridad > Configuración de cookies."}
        </li>
        <li className="ml-6">
          <b>Mozilla Firefox: </b>
          {"Opciones > Privacidad y seguridad > Cookies y datos del sitio."}
        </li>
        <li className="ml-6">
          <b>Safari: </b>
          {"Preferencias > Privacidad > Administrar cookies."}
        </li>
        <li className="ml-6">
          <b>Microsoft Edge: </b>
          {
            "Configuración > Privacidad, búsqueda y servicios > Cookies y permisos del sitio."
          }
        </li>
      </ul>
    </div>
  );
};
