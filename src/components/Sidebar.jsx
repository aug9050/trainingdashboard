import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BarChart, History, PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const menu = [
    { text: 'Current Training', icon: <BarChart />, path: '/current' },
    { text: 'Past Training', icon: <History />, path: '/past' },
    { text: 'Playback', icon: <PlayArrow />, path: '/playback' },
    { text: "Target Analytics", path: "/analytics" },
    { text: "Marksmanship", icon: <PlayArrow />, path: "/marksmanship" }

  ];

  return (
    <Box width={240} bgcolor="primary.main" color="white" display="flex" flexDirection="column">
      <Box p={2} fontWeight="bold">Training Dashboard</Box>
      <List>
        {menu.map((item) => (
          <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
