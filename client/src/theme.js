import { createTheme, alpha } from '@mui/material/styles';

export const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  const palette = {
    mode,
    primary: {
      main: isDark ? '#8B7CF6' : '#2D6A4F',
      light: isDark ? '#B7A8FF' : '#52B788',
      dark: isDark ? '#5E4BC6' : '#1B4332',
      contrastText: '#fff',
    },
    secondary: {
      main: isDark ? '#B79CFF' : '#F4A261',
      light: isDark ? '#D7CBFF' : '#FFCBA4',
      dark: isDark ? '#7D67D9' : '#C1612A',
      contrastText: '#fff',
    },
    background: {
      default: isDark ? '#0F1020' : '#F8F5F0',
      paper: isDark ? '#17192B' : '#FFFFFF',
    },
    text: {
      primary: isDark ? '#F4F1FF' : '#1A1A2E',
      secondary: isDark ? '#B7B2CC' : '#5C5C7B',
    },
    success: { main: '#52B788' },
    warning: { main: '#F4A261' },
    error: { main: '#E76F51' },
    divider: isDark ? '#2A2E49' : '#E8E4DE',
  };

  return createTheme({
    palette,
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
      isDark ? '0px 2px 10px rgba(0,0,0,0.22)' : '0px 2px 8px rgba(45,106,79,0.05)',
      isDark ? '0px 10px 24px rgba(0,0,0,0.28)' : '0px 8px 20px rgba(45,106,79,0.06)',
      isDark ? '0px 14px 32px rgba(0,0,0,0.34)' : '0px 12px 28px rgba(45,106,79,0.08)',
      isDark ? '0px 22px 44px rgba(0,0,0,0.38)' : '0px 18px 40px rgba(45,106,79,0.10)',
      ...Array(20).fill(isDark ? '0px 22px 44px rgba(0,0,0,0.38)' : '0px 18px 40px rgba(45,106,79,0.10)'),
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: palette.background.default,
            color: palette.text.primary,
            transition: 'background-color 0.25s ease, color 0.25s ease',
          },
          '::selection': {
            backgroundColor: isDark ? alpha('#8B7CF6', 0.3) : alpha('#2D6A4F', 0.18),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: '10px 22px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: isDark ? '0px 10px 24px rgba(139,124,246,0.22)' : '0px 8px 18px rgba(45,106,79,0.16)',
            },
          },
          containedPrimary: {
            background: isDark
              ? 'linear-gradient(135deg, #6E5CE6 0%, #8B7CF6 100%)'
              : 'linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)',
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
            boxShadow: isDark ? '0px 8px 28px rgba(0,0,0,0.28)' : '0px 6px 24px rgba(45,106,79,0.06)',
            border: `1px solid ${isDark ? '#262A43' : '#F0EDE8'}`,
            backgroundImage: 'none',
            backgroundColor: palette.background.paper,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 22,
            backgroundImage: 'none',
            backgroundColor: palette.background.paper,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundColor: isDark ? '#1B1E33' : '#fff',
          },
          notchedOutline: {
            borderColor: isDark ? '#33385A' : '#E8E4DE',
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
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: palette.divider,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          track: {
            backgroundColor: isDark ? alpha('#8B7CF6', 0.42) : undefined,
          },
        },
      },
    },
  });
};

const theme = createAppTheme('light');
export default theme;
