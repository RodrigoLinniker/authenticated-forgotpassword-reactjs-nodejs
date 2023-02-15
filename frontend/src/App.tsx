import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { Signup } from "./pages/Signup";
import PrivateRoute from "./routes/Route";

export default function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Signup />} path="/signup" />
      <Route
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        path="/dashboard"
      />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route path={`/reset-password`} element={<ResetPassword />} />
    </Routes>
  );
}
