import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 600,
    },
    body2: {
      fontSize: '0.9rem',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                margin: '8px 0',
            }
        },
        defaultProps: {
            variant: 'outlined', // Use outlined variant by default
            size: 'small', // Use small size by default
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                padding: '24px',
                borderRadius: 12,
            }
        }
    }
  }
});

export default theme; 