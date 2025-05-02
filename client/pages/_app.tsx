import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocationProvider } from '../context/LocationContext';
import LocationModal from '../components/LocationModal';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#f7931e',
      dark: '#f15b2a',
    },
    secondary: {
      main: '#02475b',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocationProvider>
        <Component {...pageProps} />
        <LocationModal />
      </LocationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
