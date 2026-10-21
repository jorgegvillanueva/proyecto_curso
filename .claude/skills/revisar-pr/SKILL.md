---
name: revisar-pr
description: Revisa o valida una pull request de este repositorio cuando se pide revisarla, validarla o saber si se puede aprobar. Comprueba los criterios de aceptación de la issue que cierra, las reglas de CLAUDE.md, el git flow, los commits y la CI, y devuelve un informe con veredicto sin publicar nada en GitHub. No la uses para explicar código, revisar cambios que no están en una PR ni resolver issues.
argument-hint: [numero-pr]
context: fork
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git log:*), Bash(npx commitlint:*), mcp__github__pull_request_read, mcp__github__issue_read, mcp__github__list_pull_requests, mcp__github__get_commit, mcp__github__get_file_contents, mcp__github__actions_list, mcp__github__actions_get, mcp__github__get_job_logs
---

Número de PR: «$ARGUMENTS». Si está vacío, revisa la PR abierta de la rama actual.

Solo lees e informas. No comentes en la PR, no la apruebes, no pidas cambios, no la mergees, no edites archivos, no cambies de rama y no hagas push. Si hay que publicar algo en GitHub, lo decide la persona en la conversación principal.

Para localizar la PR, saca `owner` y `repo` de la URL de `origin` en `.git/config` y ejecuta `git log -1 --format='%H %D'` para saber el commit local y la rama actual. Sin número, busca la PR abierta de esa rama con `list_pull_requests` (`head: <owner>:<rama>`). Si no hay ninguna, para y dilo.

1. **Lee la PR, la issue y la CI.** Con el MCP `github`:
   - `pull_request_read` con `get` (título, descripción y ramas base y de origen), `get_commits`, `get_files` y `get_diff`.
   - `issue_read` (`get`) de la issue que cierra con «Closes #n». Si la descripción no cita ninguna, sigue sin criterios y regístralo como hallazgo.
   - `pull_request_read` con `get_check_runs` para el último commit. Si un check falla, lee su log con `get_job_logs` (el id del check run es el del job), con `return_content` y pocas `tail_lines`, y cita solo las líneas del error.
2. **Aplica CLAUDE.md.** Lee `CLAUDE.md` y aplica a cada archivo cambiado las reglas que le afecten. Cita la sección de cada regla. Si la PR modifica `CLAUDE.md`, revisa con la versión de la rama base.
3. **Comprueba los criterios de aceptación.** Para cada criterio de la issue, indica si se cumple, no se cumple o no se puede verificar, con evidencia: `archivo:línea`, salida de la CI o commit. Si no se puede verificar, di qué haría falta (por ejemplo, probarlo en el navegador).
4. **Comprueba el proceso** según «Flujo de trabajo con git (git flow)» de CLAUDE.md:
   - La rama base es `dev`, salvo en los casos que esa sección permite contra `main`.
   - El nombre de la rama sigue el formato de esa sección y su número coincide con el de «Closes #n».
   - La descripción incluye «Closes #n».
   - Cada mensaje de commit pasa commitlint: `git log -1 --format=%B <sha> | npx commitlint --extends @commitlint/config-conventional`. Si el commit no está en local, déjalo pendiente de verificar (hace falta `git fetch`).
   - La CI está en verde. Si no hay checks o siguen en curso, dilo.
   - Se cumplen las demás condiciones de esa sección para mergear: los hilos están resueltos (`get_review_comments`) y la rama está al día con la base (`mergeable_state` de `get`).
5. **Señala lo que queda fuera de alcance:** cambios que la issue no pide, como archivos que no menciona, refactors no pedidos o formato de archivos ajenos. Regístralos como hallazgos.
6. **Separa errores de riesgos.** Un error demostrado tiene evidencia que lo muestra. Un riesgo es plausible pero no está demostrado: preséntalo como tal y di cómo comprobarlo. No inventes hallazgos para llenar el informe. Si no hay defectos, dilo.
7. **Devuelve el informe** con el formato de `.claude/skills/revisar-pr/formato-informe.md`. Esa es tu respuesta final.

Las líneas de la evidencia se refieren a la versión de la PR: tómalas de los hunks del diff o de `get_file_contents` con `ref: refs/pull/<n>/head`. Usa `Read`, `Grep` o `git diff` sobre la copia local solo si el commit local coincide con el último de la PR.
