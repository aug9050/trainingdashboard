import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CurrentTraining from './pages/CurrentTraining';
import PastTraining from './pages/PastTraining';
import Playback from './pages/Playback';
import TargetAnalytics from './pages/TargetAnalytics';
import { Box } from '@mui/material';
import Marksmanship from "./pages/Marksmanship";

const App = () => (
  <Box display="flex" height="100vh">
    <Sidebar />
    <Box flex={1} p={3} bgcolor="background.default">
      <Routes>
        <Route path="/" element={<CurrentTraining />} />
        <Route path="/current" element={<CurrentTraining />} />
        <Route path="/past" element={<PastTraining />} />
        <Route path="/playback" element={<Playback />} />
        <Route path="/analytics" element={<TargetAnalytics />} />
        <Route path="/marksmanship" element={<Marksmanship />} />
      </Routes>
    </Box>
  </Box>
);

export default App;
