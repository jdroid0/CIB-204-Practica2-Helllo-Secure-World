/**
 * ARCHIVO DE PRÁCTICA EDUCATIVA — CÓDIGO INTENCIONALMENTE INSEGURO
 *
 * Este archivo usa innerHTML con datos de usuario para que CodeQL (js/xss)
 * detecte el flujo peligroso como parte del laboratorio Hello Secure World.
 *
 * Compara con src/app.js que usa textContent correctamente.
 * La URL proporciona el nombre (fuente) → innerHTML (sumidero)
 */

/**
 * Versión INSEGURA del saludo. NO usar en producción.
 * @param {HTMLElement} outputElement - Elemento donde mostrar el saludo
 */
export function renderGreetingInsecure(outputElement) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') ?? '';
  // ✗ INSEGURO: innerHTML interpreta el contenido como HTML
  // Si name = '<script>alert("XSS")</script>', el navegador lo ejecuta
  outputElement.innerHTML = `<p>¡Hola, ${name}!</p>`;
}
