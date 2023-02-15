import { useAuth } from "../context/auth";
import { Login } from "../pages/Login";

const PrivateRoute = ({ children }: any) => {
  const { existingUser } = useAuth();

  if (!existingUser) {
    // user is not authenticated
    return <Login />;
  }

  return children;
};

export default PrivateRoute;
