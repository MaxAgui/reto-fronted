import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService, userService } from "../di/container";
import { AuthUser, LoginData } from "../services/auth.service";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored session
  useEffect(() => {
    const loadSession = async () => {
      try {
        const { user: savedUser, token: savedToken } = await authService.getStoredSession();
        
        if (savedToken) setToken(savedToken);
        if (savedUser) setUser(savedUser);
      } catch (error) {
        console.error('Error loading session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (loginData: LoginData) => {
    try {
      const apiUser = await userService.getUser();
      const { user: authUser, token: authToken } = await authService.login(loginData, apiUser);

      setUser(authUser);
      setToken(authToken);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
