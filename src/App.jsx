import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import ChartWrapper from "./components/ChartWrapper";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentRole, getIsAuthenticated, roleRouteMap } from "./features/role/roleSlice";

function App() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const currentRole = useSelector(getCurrentRole);
  const homePath = roleRouteMap[currentRole] || '/investor';

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? homePath : '/home'} replace />}
      />

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Navigate to="/login?mode=signup" replace />} />

      <Route element={<Layout />}>
        <Route
          path="/admin"
          element={(
            <ProtectedRoute allowedRoles={['Admin']}>
              <ChartWrapper />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/investor"
          element={(
            <ProtectedRoute allowedRoles={['Investor']}>
              <ChartWrapper />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/advisor"
          element={(
            <ProtectedRoute allowedRoles={['Financial Advisor']}>
              <ChartWrapper />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/analyst"
          element={(
            <ProtectedRoute allowedRoles={['Data Analyst']}>
              <ChartWrapper />
            </ProtectedRoute>
          )}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
