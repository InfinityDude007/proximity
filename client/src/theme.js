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
    success: {
      main: '#52B788',
    },
    warning: {
      main: '#F4A261',
    },
    error: {
      main: '#E76F51',
    },
    divider: '#E8E4DE',
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    body1: {
      fontFamily: '"DM Sans", sans-serif',
      lineHeight: 1.65,
    },
    body2: {
      fontFamily: '"DM Sans", sans-serif',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(45,106,79,0.06)',
    '0px 4px 16px rgba(45,106,79,0.08)',
    '0px 6px 24px rgba(45,106,79,0.10)',
    '0px 8px 32px rgba(45,106,79,0.12)',
    ...Array(20).fill('0px 8px 32px rgba(45,106,79,0.12)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(45,106,79,0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0px 2px 12px rgba(45,106,79,0.08)',
          border: '1px solid #F0EDE8',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 68,
          borderTop: '1px solid #E8E4DE',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#2D6A4F',
          },
        },
        label: {
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.72rem',
          '&.Mui-selected': {
            fontSize: '0.72rem',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
