# Formato del informe

Usa esta plantilla para la respuesta final de `revisar-pr`. Mantén todas las secciones. Si una no tiene contenido, escribe «Ninguno».

- La evidencia es `archivo:línea` de la versión de la PR, el SHA corto de un commit o una línea citada de la CI.
- Sé breve: una fila o una viñeta por idea.

## Veredicto

- **Aprobable:** todos los criterios se cumplen (o no se pueden verificar por causas ajenas a la PR), el proceso es correcto, la CI está en verde y no hay errores demostrados.
- **Aprobable con cambios:** no hay hallazgos de gravedad alta, pero hay hallazgos medios o bajos (convenciones, alcance o proceso) que se corrigen sin rehacer el trabajo.
- **No aprobable:** algún criterio no se cumple, hay un error demostrado de gravedad alta, la CI falla o la PR va contra una rama base no permitida.

## Gravedad

- **Alta:** incumple un criterio o rompe la funcionalidad, la arquitectura por capas o la seguridad.
- **Media:** incumple una convención de CLAUDE.md o el proceso, o deja un riesgo probable.
- **Baja:** afecta a la legibilidad, los nombres o el estilo, pero no impide mergear.

## Plantilla

```markdown
# Revisión de la PR #<n>: <título>

**Veredicto:** <Aprobable | Aprobable con cambios | No aprobable>. <Motivo principal en una frase.>

## Criterios de aceptación (#<issue>)

| Criterio                         | Estado                                             | Evidencia   |
| -------------------------------- | -------------------------------------------------- | ----------- |
| <criterio tal como está escrito> | <Se cumple / No se cumple / No se puede verificar> | <evidencia> |

## Hallazgos

1. **[Alta · Error demostrado] <título>**
   - Evidencia: <archivo:línea, commit o línea de la CI>
   - Impacto: <qué falla o qué regla se incumple>
   - Comprobación sugerida: <cómo confirmarlo o qué cambiar>

## CI, commits y proceso

| Comprobación                  | Resultado | Evidencia |
| ----------------------------- | --------- | --------- |
| CI del commit <sha corto>     | <✅ / ❌> | <check>   |
| Rama base                     | <✅ / ❌> | <base>    |
| Nombre de la rama             | <✅ / ❌> | <rama>    |
| «Closes #n» en la PR          | <✅ / ❌> | <#n>      |
| Hilos resueltos y rama al día | <✅ / ❌> | <estado>  |

| Commit      | Mensaje         | commitlint            |
| ----------- | --------------- | --------------------- |
| <sha corto> | <primera línea> | <pasa / falla: regla> |

## Pendientes de verificar

- <Qué no se ha podido comprobar, por qué y cómo comprobarlo.>
```
