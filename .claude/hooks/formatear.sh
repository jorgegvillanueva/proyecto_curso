#!/usr/bin/env bash
# formatear.sh formatea con Prettier el archivo que Claude acaba de editar o crear (hook PostToolUse).
set -u

# Se ejecuta desde la raíz del proyecto para que npx use el Prettier local y su configuración.
cd "$(dirname "$0")/../.." || exit 0

# Lee el JSON del hook de la entrada estándar y extrae tool_input.file_path.
ruta=$(node -e '
  const datos = JSON.parse(require("fs").readFileSync(0, "utf8"));
  process.stdout.write(datos.tool_input?.file_path ?? "");
' 2>/dev/null)

if [ -z "$ruta" ]; then
  exit 0
fi

if ! salida=$(npx prettier --write --ignore-unknown "$ruta" 2>&1); then
  echo "Prettier no ha podido formatear $ruta:" >&2
  echo "$salida" >&2
  exit 2
fi
