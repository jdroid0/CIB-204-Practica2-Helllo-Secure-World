# Escenario 03 SAST y XSS basado en DOM

## Objetivo

Observar un flujo desde la URL hacia un sumidero inseguro, revisar los resultados del análisis y corregir el código para insertar el valor como texto.

## Introducir el ejemplo inseguro

Desde la raíz del fork, crea una rama y copia el archivo:

```bash
git checkout main
git pull origin main
git checkout -b lab/codeql-xss-demo
cp practice/scenarios/03-xss/src/demo-insecure.js src/demo-insecure.js
git add src/demo-insecure.js
git commit -m "lab: agregar ejemplo inseguro para CodeQL"
git push -u origin lab/codeql-xss-demo
```

Abre un Pull Request hacia `main`. `Lab Validation` debe fallar mientras detecte `innerHTML`. CodeQL analiza el flujo desde `window.location.search`; su análisis puede tardar varios minutos. CodeQL puede publicar una alerta sin hacer fallar su propio check, por eso el gate reproducible del ejercicio es `Lab Validation`.

## Revisar y corregir

La URL no es confiable. El archivo la lee con `URLSearchParams` y la inserta con `innerHTML`, que interpreta el valor como HTML. Reemplaza la inserción por `textContent`:

```js
const name = new URLSearchParams(window.location.search).get('name') ?? '';
outputElement.textContent = `¡Hola, ${name}!`;
```

Si se necesita conservar un elemento `<p>`, créalo con `document.createElement`, asigna el texto a `p.textContent` y añade el elemento con `appendChild`.

Sube la corrección a la misma rama:

```bash
git add src/demo-insecure.js
git commit -m "fix: mostrar el saludo como texto"
git push
```

`Lab Validation` debe pasar. Revisa también el nuevo resultado de CodeQL y confirma que la alerta se corrigió o cerró después del análisis. No configures CodeQL como check requerido esperando que sus alertas hagan fallar automáticamente el workflow.

## Evidencia

- PR y comentario de `Lab Validation` con el hallazgo inicial.
- Cambio de `innerHTML` a `textContent`.
- Ejecución final verde y resultado posterior de CodeQL.
