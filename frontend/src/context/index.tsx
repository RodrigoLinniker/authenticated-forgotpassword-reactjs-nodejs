import { AuthProvider } from "./auth";

const AppProvider = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
