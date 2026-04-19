import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2D6A4F',
      light: '#52B788',
      dark: '#1B4332',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F4A261',
      light: '#FFCBA4',
      dark: '#C1612A',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F5F0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#5C5C7B',
    },
    success: { main: '#52B788' },
    warning: { main: '#F4A261' },
    error: { main: '#E76F51' },
    divider: '#E8E4DE',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 600 },
    h4: { fontFamily: '"DM Sans", sans-serif', fontWeight: 800 },
    h5: { fontFamily: '"DM Sans", sans-serif', fontWeight: 700 },
    h6: { fontFamily: '"DM Sans", sans-serif', fontWeight: 700 },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    body1: { fontFamily: '"DM Sans", sans-serif', lineHeight: 1.65 },
    body2: { fontFamily: '"DM Sans", sans-serif', lineHeight: 1.6 },
  },
  shape: { borderRadius: 16 },
  shadows: [
    'none',
    '0px 2px 8px rgba(45,106,79,0.05)',
    '0px 8px 20px rgba(45,106,79,0.06)',
    '0px 12px 28px rgba(45,106,79,0.08)',
    '0px 18px 40px rgba(45,106,79,0.10)',
    ...Array(20).fill('0px 18px 40px rgba(45,106,79,0.10)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8F5F0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '10px 22px',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0px 8px 18px rgba(45,106,79,0.16)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          boxShadow: '0px 6px 24px rgba(45,106,79,0.06)',
          border: '1px solid #F0EDE8',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#fff',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;
