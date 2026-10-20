# Preparación desde GitHub Codespaces

Sigue la guía Word que acompaña este paquete. El ZIP que contiene esta carpeta incluye el proyecto completo. En Codespaces, extrae el ZIP en `/tmp` y copia todo su contenido a la raíz del fork con `cp -a /tmp/hsw-actualizado/Hello-Secure-World-Lab-CIB204-Reinicio/. .`. Esto garantiza que existan el `package.json` y `package-lock.json` principales, además de `.nvmrc`, `.github/workflows`, código, pruebas y escenarios. El ZIP no incluye `.git` ni `node_modules`; el historial se conserva y las dependencias se instalan con `npm ci`. El lockfile actualizado corrige hallazgos HIGH transitivos del punto de partida; conserva sin cambios el `package.json` raíz.

## Regla importante para el escenario SCA

Trabaja siempre desde la raíz del repositorio. No reemplaces `package.json` raíz con `practice/scenarios/01-sca/package.json`: ese archivo es solo una muestra educativa y no contiene las dependencias ni los scripts del proyecto. Copia el proyecto completo del ZIP para comenzar con el manifiesto y lockfile raíz sincronizados; después usa npm para modificar las dependencias del ejercicio. Introduce la dependencia en el manifiesto raíz con `npm install --save-exact lodash@4.17.4`; npm actualizará ambos archivos de forma sincronizada.

## Comprobación inicial

Usa Node.js 22, igual que los workflows. Si `node --version` no muestra una versión 22.x y `nvm` está disponible, ejecuta `nvm install 22 && nvm use 22`. En Codespaces (raíz del repositorio), ejecuta `node --version`, `npm --version`, `npm ci`, `npm run lint`, `npm test`, `npm run build` y `npm audit --audit-level=high`. El estado inicial esperado es sin errores y sin vulnerabilidades HIGH ni CRITICAL. No incluyas `node_modules/` en commits ni en el ZIP; `.gitignore` lo excluye.

Después de copiar archivos abre el PR de preparación y mézclalo a `main` una vez que termine CI. Ejecuta cada escenario en una rama aparte, con un Pull Request hacia `main`. En la fase vulnerable, que SCA o Lab Validation fallen es intencional; deben pasar después de la corrección.

## Si Actions muestra ENOENT y no encuentra package.json

Este mensaje significa que falta el manifiesto principal en la raíz del repositorio. Ejecuta `pwd` y `find . -maxdepth 4 -name package.json -not -path "*/node_modules/*"`. Debe aparecer `./package.json` además de `./practice/scenarios/01-sca/package.json`. Si solo aparece el segundo, repite la copia completa del ZIP a la raíz. No renombres el manifiesto del escenario.

## Si `npm ci` falla

`npm ci` necesita que `package.json` y `package-lock.json` coincidan. En el PR SCA restaura ambos desde la rama `main` del fork y vuelve a agregar la dependencia usando npm: `git show origin/main:package.json > package.json`, `git show origin/main:package-lock.json > package-lock.json`, `npm install --save-exact lodash@4.17.4`. Luego corre lint y pruebas, confirma los dos archivos y súbelos. No agregues `node_modules/`.

## Alcance de los escenarios

- SCA detecta una dependencia conocida; nunca sustituyas el manifiesto raíz.
- Secret Scanning utiliza un marcador ficticio, no una alerta nativa ni una credencial real.
- SAST valida `src/demo-insecure.js`; el gate ignora los ejemplos `innerHTML` que forman parte del simulador. CodeQL puede tardar y sus alertas no necesariamente hacen fallar el check.
