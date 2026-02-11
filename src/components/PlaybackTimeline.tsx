import React from 'react';
import { Box, Button } from '@mui/material';

const PlaybackTimeline = ({ data, onBookmarkClick }: any) => (
  <Box display="flex" gap={1} mb={2}>
    {data.map((point: any, idx: number) => (
      <Button key={idx} variant="contained" onClick={() => onBookmarkClick(point.time)}>
        {point.time}s
      </Button>
    ))}
  </Box>
);

export default PlaybackTimeline;
