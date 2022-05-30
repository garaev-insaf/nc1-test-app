import * as React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Link } from '@mui/material';

const HeaderComponent = () => {

    return (
        <AppBar position="static" color="primary" sx={{ bgcolor: '#F3F3F3' }}>
            <Toolbar>
                <nav>
                    <Link
                        component={RouterLink}
                        to="/"
                        underline='none'
                        color="#000000"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        News
                    </Link>
                    <Link
                        component={RouterLink}
                        underline='none'
                        to="/profile"
                        color="#000000"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Profile
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    );
};
export default HeaderComponent;
