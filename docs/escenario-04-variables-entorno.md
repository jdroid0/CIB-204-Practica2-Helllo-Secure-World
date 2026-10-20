# Escenario 04 - Validación segura de variables de entorno

Demostrar cómo Node.js comprueba la disponibilidad de una variable
de entorno sin revelar su contenido.

## Investigación
GitHub Codespaces permite configurar secretos para proporcionar
variables de entorno al entorno de desarrollo.

GitHub Actions permite almacenar secretos del repositorio y
utilizarlos en los workflows mediante el contexto secrets.

Fuentes:
- https://docs.github.com/en/codespaces/managing-your-codespaces/managing-your-account-specific-secrets-for-github-codespaces
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets

## Implementación
Se creó scripts/check-env.js para comprobar la variable
process.env.API_TOKEN.

El script muestra un mensaje cuando la variable no está configurada
y confirma su presencia cuando existe, sin imprimir su valor.

## Pruebas realizadas
Prueba 1: variable ausente.
Resultado: ERROR: API_TOKEN no está configurada.

Prueba 2: variable con marcador ficticio temporal.
Resultado: OK: API_TOKEN está configurada.

## Protección
Separar las credenciales del código reduce el riesgo de publicarlas
accidentalmente en el repositorio.

Evitar imprimir su contenido también reduce el riesgo de exposición
en los registros de la aplicación.

## Limitación
Se realizó una simulación local con un marcador ficticio.
No se configuró un secreto almacenado en GitHub Codespaces o
GitHub Actions

Además, una variable de entorno no garantiza por sí sola que
una credencial sea segura o que no pueda ser leída por un
proceso con acceso suficiente.

## Respuesta ante exposición de una credencial real
1. Revocar inmediatamente la credencial comprometida.
2. Generar una nueva credencial y actualizar los sistemas autorizados.
3. Revisar los registros para identificar dónde y cuándo se utilizó.
4. Investigar posibles accesos no autorizados.
5. Corregir la causa de la exposición y prevenir recurrencias.
