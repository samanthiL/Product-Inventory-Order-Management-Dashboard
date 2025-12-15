// src/components/common/Layout.tsx

import React, { useState } from 'react';
import { Box, Toolbar, CssBaseline, createTheme, Paper, ThemeProvider } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
// import { useAppSelector } from '../../hooks/redux'; // For dark mode toggle

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
 const[mode,setMode]=useState(true)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Create a dynamic MUI theme based on Redux state
  const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});
  const darkTheme = createTheme({
   palette: {
      mode: mode ?'dark' : 'light',
    },
  });
 
  const handleChange = ()=>{
    if (mode) {
        setMode(false)
    }else{
    setMode(true)

    }
  }
  
  return (
                <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* 1. Header (Top Navigation) */}
        <Header drawerWidth={drawerWidth} mode={mode} handleChange={handleChange}/>
        
        {/* 2. Sidebar (Left Navigation) */}
        <Sidebar 
          drawerWidth={drawerWidth} 
          mobileOpen={mobileOpen} 
          handleDrawerToggle={handleDrawerToggle} 
        />
        
        {/* 3. Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            // Use background color from the theme palette
            backgroundColor: theme.palette.background.default, 
            mt: 8 
          }}
        >
          <Toolbar sx={{ minHeight: '0 !important', p: 0 }} />
          <Paper elevation={0} sx={{ p: 0, minHeight: 'calc(100vh - 120px)' }}>
            {children} {/* Renders the current page */}
          </Paper>
        </Box>
      </Box>
      </ThemeProvider>
  );
};

export default Layout;