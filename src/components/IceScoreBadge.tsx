import { Chip } from '@mui/material';

import { getIcePriority } from '../utils/getIcePriority';

import type { IcePriority } from '../types/IceScore';
import type { ChipProps } from '@mui/material';

interface IceScoreBadgeProps {
  score: number | null;
  muted?: boolean;
}

const PRIORITY_COLORS: Record<IcePriority, ChipProps['color']> = {
  high: 'success',
  low: 'default',
  medium: 'warning',
};

// formatIceScore muestra la puntuación ICE con una precisión estable, o un guion si aún no existe.
function formatIceScore(score: number | null): string {
  return score === null ? 'ICE —' : `ICE ${score.toFixed(1)}`;
}

// getBadgeColor elige el color del chip: neutro sin puntuación o atenuado, y si no, el de su prioridad.
function getBadgeColor(
  score: number | null,
  muted: boolean,
): ChipProps['color'] {
  return score === null || muted
    ? 'default'
    : PRIORITY_COLORS[getIcePriority(score)];
}

// IceScoreBadge muestra la puntuación ICE calculada con el color de su prioridad.
function IceScoreBadge({ score, muted = false }: IceScoreBadgeProps) {
  return (
    <Chip
      color={getBadgeColor(score, muted)}
      label={formatIceScore(score)}
      size="small"
      sx={{ fontWeight: 700 }}
    />
  );
}

export default IceScoreBadge;
