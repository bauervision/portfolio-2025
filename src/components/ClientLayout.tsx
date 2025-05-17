// app/ClientLayout.tsx
'use client';

import { ReactNode, useMemo, useState, createContext, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './NavBar';
import Footer from './Footer';


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    setMode('light'); // or auto-detect if preferred
  }, []);

  useEffect(() => {
  setMode('light');
  document.body.classList.add('loaded');
}, []);

  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
    }),
    []
  );

const theme = useMemo(
  () =>
    createTheme({
      palette: {
        mode: mode ?? 'light',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: '#000000', // force black start
            },
          },
        },
      },
    }),
  [mode]
);


  if (mode === null) return null;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
         <Footer/>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
