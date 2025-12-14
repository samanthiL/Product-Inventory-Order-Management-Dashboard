// src/components/common/Header.tsx

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Switch, FormControlLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { useAppDispatch } from '../../hooks/redux';
// import { toggleDarkMode } from '../../store/uiSlice'; // Assuming this action exists

interface HeaderProps {
    drawerWidth: number;
    handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleDrawerToggle }) => {
    // const isDarkMode = useAppSelector(state => state.ui.darkMode);

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
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }} // Only show on mobile
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    SSE Inventory Dashboard
                </Typography>
                
                {/* Dark/Light Mode Toggle */}
                <FormControlLabel
                    control={
                        <Switch
                            // checked={isDarkMode}
                            // onChange={() => dispatch(toggleDarkMode())}
                            name="darkModeToggle"
                            color="default"
                            icon={<LightModeIcon sx={{ color: 'yellow' }} />}
                            checkedIcon={<DarkModeIcon />}
                        />
                    }
                    label="" // Empty label
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;