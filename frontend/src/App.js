import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BankerDashboard from './components/BankerDashboard';
import Signup from './components/Signup';
import RootRedirect from './components/RootRedirect';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

const Navigation = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <AppBar position="static" color="primary" elevation={8}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ px: 2 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Banking System
                    </Typography>

                    {/* For smaller screens */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Banking System
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} /> {/* This pushes the user info to the right */}

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ mr: 2, color: 'inherit', fontWeight: 'bold' }}>
                            Welcome, {user.name}
                        </Typography>
                        <Button color="inherit" onClick={logout} sx={{ fontWeight: 'bold' }}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <ThemeProvider theme={theme}>
                    <Navigation />
                    <Container>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/banker"
                                element={
                                    <PrivateRoute requiredRole="banker">
                                        <BankerDashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/" element={<RootRedirect />} />
                        </Routes>
                    </Container>
                </ThemeProvider>
            </Router>
        </AuthProvider>
    );
};

export default App;
