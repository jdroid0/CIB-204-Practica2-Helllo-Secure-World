# Escenario 02 Secret Scanning y manejo de secretos

## Objetivo

Practicar la respuesta y corrección de un secreto detectado usando una muestra ficticia. El workflow `Lab Validation` simula el hallazgo para que el ejercicio sea reproducible sin publicar credenciales.

## Nota de seguridad

`HSW_DEMO_SECRET_DO_NOT_USE` no es un token real y no activa necesariamente GitHub Push Protection. No crees ni pegues un token real para forzar una alerta. GitHub solo detecta formatos compatibles con patrones de proveedores. Un push bloqueado nativamente no llega a Actions y no puede producir un comentario del validador.

## Pasos

Desde la raíz del fork, copia la muestra y crea una rama:

```bash
git checkout main
git pull origin main
git checkout -b lab/secret-scanning-demo
mkdir -p config
cp practice/scenarios/02-secret/config/settings.js config/settings.js
git add config/settings.js
git commit -m "lab: agregar marcador ficticio para secret scanning"
git push -u origin lab/secret-scanning-demo
```

Abre un Pull Request hacia `main`. El push debe llegar al fork. Espera a que `Lab Validation` publique el comentario: debe señalar el marcador ficticio y el gate debe fallar mientras esté presente. No se espera una alerta nativa en **Security → Secret scanning alerts**.

## Corregir el hallazgo

Edita `config/settings.js` para eliminar el marcador y usar una variable de entorno:

```js
const config = {
  apiUrl: 'https://api.example.com',
  token: process.env.API_TOKEN,
};
export default config;
```

Guarda y sube la corrección a la misma rama:

```bash
git add config/settings.js
git commit -m "fix: leer token desde variable de entorno"
git push
```

El comentario actualizado debe confirmar que el marcador se eliminó y `Lab Validation` debe pasar. En un incidente real, revoca cualquier credencial expuesta antes de retirarla del código. Si una protección nativa bloquea un push, corrige también el commit local antes de reintentar.

## Evidencia

- PR y comentario del hallazgo simulado.
- Archivo corregido con `process.env.API_TOKEN`.
- Ejecución final verde de `Lab Validation`.
- Indica en la entrega que la detección de este ejercicio fue simulada.
