# Escenario 01 — SCA: Dependencia Vulnerable

## Objetivo

Ver un Security Gate de SCA fallar en CI, entender por qué, y aprender a corregirlo.

## Prerequisitos

- Completaste la configuración en `practice/SETUP.md`
- Tu fork tiene GitHub Actions habilitado
- Usa Node.js 22 en Codespaces, igual que los workflows del repositorio

## El problema

El archivo `package.json` en este directorio incluye `lodash@4.17.4`.
Esta versión tiene el CVE-2020-8203 (Prototype Pollution, severidad HIGH).
El job `security` de CI ejecuta `npm audit --audit-level=high`, lo que detectará este problema.

## Pasos

> Ejecuta los comandos desde la raíz del proyecto en Codespaces. No reemplaces el `package.json` raíz con el archivo de muestra de esta carpeta. Usa `npm install` para que npm mantenga `package.json` y `package-lock.json` sincronizados.


### 1. Introduce la dependencia vulnerable en tu fork

```bash
git checkout main
git pull origin main
git checkout -b lab/sca-vulnerable-dep
# En la raíz del fork; agrega la dependencia sin reemplazar el package.json.
npm install --save-exact lodash@4.17.4
```

### 2. Verifica localmente

```bash
npm audit --audit-level=high
```

Deberías ver algo como:
```
lodash  <=4.17.23
Severity: high o critical
Prototype Pollution - https://github.com/advisories/GHSA-jf85-cpcp-j695
```

### 3. Crea un PR

```bash
git add package.json package-lock.json
git commit -m "lab: introduce dependencia vulnerable para práctica SCA"
git push -u origin lab/sca-vulnerable-dep
```

En GitHub, abre un Pull Request desde `lab/sca-vulnerable-dep` hacia `main`.
Mientras la dependencia siga vulnerable, el check de seguridad debe fallar; el resto de
checks funcionales debe pasar. `Lab Validation` publicará el resultado del escenario.

### 4. Observa el fallo de CI

En la pestaña **Actions** de tu fork, verás que el job `security` falla:
- **quality** ✓ PASSED
- **test** ✓ PASSED
- **security** ✗ FAILED — npm audit reporta una vulnerabilidad HIGH o CRITICAL

El PR mostrará el check de seguridad como fallido. `Lab Validation` también falla el
gate hasta que se corrija la dependencia.
Si tienes Branch Protection con Required Status Checks, el PR no podrá mergearse.

### 5. Corrige la vulnerabilidad

```bash
# Actualiza lodash a la versión corregida
npm install --save-exact lodash@4.18.1
git add package.json package-lock.json
git commit -m "fix: actualizar lodash a versión segura (CVE-2020-8203)"
git push
```

### 6. Verifica que CI pasa

Observa cómo los checks de seguridad pasan después del nuevo push. El PR queda listo para
revisión; no es necesario mergearlo para entregar la evidencia.

## Conceptos aprendidos

- **SCA como Security Gate**: `npm audit` + política `--audit-level=high` + Required Status Check
- **El package-lock.json importa**: npm audit analiza el árbol de dependencias bloqueado
- **El gate funciona**: aunque lodash no está en el código fuente del proyecto, su CVE bloquea el merge
- **La corrección requiere ambos archivos**: `package.json` (rango) y `package-lock.json` (versión exacta)

## Código de verificación

Cuando el PR tenga todos los checks en verde, el workflow `lab-validate.yml` publicará
un comentario con un hash de servidor `HSW-PRACTICE-XXXXXXXXXXXXXXXX`.
Comparte ese código con tu instructor junto con tu código HSW del simulador.

