// src/components/common/Header.tsx

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    drawerWidth: number;
    handleChange: () => void;
    mode:boolean
}

const Header: React.FC<HeaderProps> = ({ drawerWidth,mode,handleChange}) => {
 
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }} // Only show on mobile
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    SSE Inventory Dashboard
                </Typography>
                
                {/* Dark/Light Mode Toggle */}
              <Switch
              checked={mode}
              onChange={handleChange}
              inputProps={{'aria-label': 'controlled'}}
              />
            </Toolbar>
        </AppBar>
    );
};

export default Header;