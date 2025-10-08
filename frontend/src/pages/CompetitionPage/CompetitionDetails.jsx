import React from 'react';
import { Button, Typography, Box } from '@mui/material';

export default function CompetitionDetails({ type, id, name, onBack }) {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {name ?? `#${id}`}
      </Typography>

    </Box>
  );
}
