# Hello Secure World — Práctica GitHub Codespaces

Tres escenarios reproducibles para practicar SCA, gestión de secretos y SAST. Sigue la guía Word incluida por separado y usa un fork propio. Todo el trabajo de la terminal se realiza en GitHub Codespaces; no clones el repositorio en tu computadora.

| Escenario | Archivo que se lleva al proyecto | Hallazgo inicial | Corrección esperada |
|---|---|---|---|
| 01 SCA | `package.json` y `package-lock.json` raíz | `lodash@4.17.4`, hallazgo HIGH o CRITICAL | `lodash@4.18.1` |
| 02 Secret | `config/settings.js` | marcador inerte simulado por Lab Validation | variable `process.env.API_TOKEN` |
| 03 SAST | `src/demo-insecure.js` | flujo de URL a `innerHTML` | `textContent` |

## Importante

El `package.json` de `scenarios/01-sca` describe únicamente el ejemplo. No lo copies sobre el manifiesto raíz. Ejecuta `npm install --save-exact lodash@4.17.4` desde la raíz para conservar scripts y dependencias del proyecto y actualizar el lockfile correctamente.

La carpeta `node_modules/` se instala con `npm ci` en Codespaces y no se versiona. El marcador del escenario de secretos es ficticio; nunca uses una credencial real. El gate de XSS se limita al archivo de práctica para no fallar por ejemplos didácticos del simulador.

