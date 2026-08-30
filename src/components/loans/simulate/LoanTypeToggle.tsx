'use client';
import { LoanType } from '@/types/loans/loanTypes';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

interface Props {
  value: LoanType;
  onChange: (value: LoanType) => void;
}

export function LoanTypeToggle({ value, onChange }: Props) {
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Tipo de cuota
      </Typography>
      <ToggleButtonGroup
        exclusive
        fullWidth
        value={value}
        onChange={(_, next) => next && onChange(next)}
      >
        <ToggleButton value="Fixed">Cuota fija</ToggleButton>
        <ToggleButton value="Decreasing">Cuota decreciente</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
