import { createContext, useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ICredentialsDev from "../interfaces/credentialsDev";
import api from "../services/api";

interface IUser {
  id: number;
  username: string;
  email: string;
}

interface IAuthState {
  token: string;
  existingUser: IUser;
}

interface IAuthContextState {
  existingUser: IUser;
  signInDev(credentials: ICredentialsDev): Promise<void>;
  signOut(): void;
  updateUser(existingUser: IUser): void;
}

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState
);

export const AuthProvider = ({ children }: any) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem("token");
    const existingUser = localStorage.getItem("existingUser");

    if (token && existingUser) {
      api.defaults.headers.head["Authorization"] = `Bearer ${token}`;
      return {
        token,
        existingUser: JSON.parse(existingUser),
      };
    }

    return {} as IAuthState;
  });
  const signInDev = useCallback(async (credentials: ICredentialsDev) => {
    const response = await api.post("/login", credentials);
    const { token, existingUser } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("existingUser", JSON.stringify(existingUser));

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setData({
      token,
      existingUser,
    });
  }, []);

  const updateUser = useCallback(
    async (existingUser: any) => {
      localStorage.setItem("existingUser", JSON.stringify(existingUser));

      setData({
        token: data.token,
        existingUser,
      });
    },
    [data.token]
  );

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("existingUser");
  };

  return (
    <AuthContext.Provider
      value={{
        existingUser: data.existingUser,
        signInDev,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
