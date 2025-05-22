import React from 'react';
import { Box, Typography } from '@mui/material';

const Heatmap = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4">🔥 Correlation Heatmap (Coming Soon)</Typography>
      <Typography>
        This section will display correlation values between stocks using Pearson correlation coefficient.
      </Typography>
    </Box>
  );
};

export default Heatmap;
