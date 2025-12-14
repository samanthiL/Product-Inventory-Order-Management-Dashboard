// src/components/common/Sidebar.tsx

import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, useTheme, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps {
    drawerWidth: number;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const navItems = [
    { text: 'Products', icon: <InventoryIcon />, path: '/products' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
];

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
    const theme = useTheme();

    const drawer = (
        <div>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                    Admin Panel
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path} onClick={handleDrawerToggle}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Mobile Drawer (Temporary) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }} // Better performance on mobile
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            
            {/* Desktop Drawer (Permanent) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;