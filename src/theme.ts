import { createTheme } from '@mui/material/styles';

const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0D47A1' },
    secondary: { main: '#1976D2' },
    background: { default: '#0A1E3A', paper: '#0D2B5E' },
    text: { primary: '#FFFFFF', secondary: '#B0C4DE' },
  },
});

export default darkBlueTheme;
