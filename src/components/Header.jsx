import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { switchTheme, getTheme } from '../features/theme/themeSlice';
import { getCurrentRole, getCurrentUserName, getIsAuthenticated, logout } from '../features/role/roleSlice';
import "@fontsource/exo/700.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(getTheme);
  const currentRole = useSelector(getCurrentRole);
  const userName = useSelector(getCurrentUserName);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleThemeChange = () => {
    dispatch(switchTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home', { replace: true });
  };

  return (
    <>
      <AppBar elevation={0} variant="dense" component="nav" sx={{ height: 60, backgroundColor: "background.contrast", zIndex: 9,  color: "#2d2e2e", borderBottom: 2, borderBottomColor: "#ff834f", position: "fixed" }}>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "inline-flex", height: "100%", alignItems: "center" }}>
            <QueryStatsIcon sx={{ mr: "5px", fontSize: 20, backgroundColor: "#ff834f", color: "white" }} />
            <Typography component="div" variant="h6" fontWeight="bold" fontFamily="Exo" sx={{ color: "text.secondary" }}>
              India Mutual Fund
            </Typography>
          </div>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 'auto' }}>
            {isAuthenticated && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userName} • {currentRole}
              </Typography>
            )}

            <IconButton aria-label="mode" sx={{ fontSize: 24, color: "text.secondary" }} onClick={handleThemeChange}>
              {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            {isAuthenticated && (
              <Button variant="outlined" size="small" onClick={handleLogout}>Logout</Button>
            )}
          </Stack>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
