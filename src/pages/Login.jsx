import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  getCurrentRole,
  getIsAuthenticated,
  getRegisteredUsers,
  getRoleStatus,
  getRoleError,
  loginWithCredentials,
  loginWithRole,
  loginUser,
  registerUser,
  registerUserAsync,
  roleRouteMap,
  clearError,
} from '../features/role/roleSlice';

const roles = ['Admin', 'Investor', 'Financial Advisor', 'Data Analyst'];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentRole = useSelector(getCurrentRole);
  const registeredUsers = useSelector(getRegisteredUsers);
  const status = useSelector(getRoleStatus);
  const error = useSelector(getRoleError);

  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('Investor');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const fromPath = useMemo(() => location.state?.from?.pathname, [location.state]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(roleRouteMap[currentRole] || '/investor', { replace: true });
    }
  }, [isAuthenticated, currentRole, navigate]);

  useEffect(() => {
    if (registeredUsers.length === 0 && mode !== 'signup') {
      setSearchParams({ mode: 'signup' }, { replace: true });
    }
  }, [registeredUsers.length, mode, setSearchParams]);

  // Handle backend API errors
  useEffect(() => {
    if (error) {
      setLocalError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const switchMode = (nextMode) => {
    setLocalError('');
    setSearchParams({ mode: nextMode }, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userName.trim()) {
      setLocalError('Enter user name.');
      return;
    }

    if (!password.trim()) {
      setLocalError('Enter password.');
      return;
    }

    if (mode === 'signup') {
      // Try to register with backend API first
      try {
        await dispatch(registerUserAsync({ 
          userName: userName.trim(), 
          password: password.trim(), 
          role 
        })).unwrap();
        
        // After successful registration, try to login
        await dispatch(loginUser({ 
          userName: userName.trim(), 
          password: password.trim() 
        })).unwrap();
        
        navigate(roleRouteMap[role], { replace: true });
      } catch (err) {
        // If backend fails, fall back to local storage
        const alreadyExists = registeredUsers.some(
          (user) => user.userName.toLowerCase() === userName.trim().toLowerCase()
        );

        if (alreadyExists) {
          setLocalError('User already exists. Please sign in.');
          return;
        }

        dispatch(registerUser({ userName: userName.trim(), password: password.trim(), role }));
        dispatch(loginWithRole({ userName: userName.trim(), role }));
        navigate(roleRouteMap[role], { replace: true });
      }
      return;
    }

    // Login mode - try backend API first
    try {
      await dispatch(loginUser({ 
        userName: userName.trim(), 
        password: password.trim() 
      })).unwrap();
      
      setLocalError('');
      navigate(fromPath && fromPath !== '/login' ? fromPath : roleRouteMap[currentRole] || '/investor', { replace: true });
    } catch (err) {
      // Fall back to local storage if backend fails
      if (registeredUsers.length === 0) {
        setLocalError('No users found. Please sign up first.');
        switchMode('signup');
        return;
      }

      const validUser = registeredUsers.find(
        (user) => user.userName.toLowerCase() === userName.trim().toLowerCase() && user.password === password.trim()
      );

      if (!validUser) {
        setLocalError('Invalid credentials.');
        return;
      }

      dispatch(loginWithCredentials({ userName: userName.trim(), password: password.trim() }));
      setLocalError('');

      navigate(fromPath && fromPath !== '/login' ? fromPath : roleRouteMap[validUser.role], { replace: true });
    }
  };

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 460 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            {mode === 'signup'
              ? 'Register a user account and choose your role.'
              : 'Sign in to access your role-specific dashboard.'}
          </Typography>

          {registeredUsers.length === 0 && (
            <Alert severity="info" sx={{ mb: 1.5 }}>
              No registered users found. Please sign up first.
            </Alert>
          )}

          <Stack component="form" spacing={1.5} onSubmit={handleSubmit}>
            <TextField
              label="User name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              size="small"
            />

            {mode === 'signup' && (
              <Select size="small" value={role} onChange={(event) => setRole(event.target.value)}>
                {roles.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </Select>
            )}

            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              size="small"
            />

            {(localError || error) && <Alert severity="error">{localError || error}</Alert>}

            <Button type="submit" variant="contained">
              {mode === 'signup' ? 'Sign Up' : 'Sign In'}
            </Button>

            <Stack direction="row" justifyContent="space-between" sx={{ pt: 0.5 }}>
              <Link component={RouterLink} to="/home" underline="hover" variant="caption">
                Back to Home
              </Link>

              {mode === 'signup' ? (
                <Button variant="text" size="small" onClick={() => switchMode('signin')}>
                  Already have account? Sign In
                </Button>
              ) : (
                <Button variant="text" size="small" onClick={() => switchMode('signup')}>
                  New user? Sign Up
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
