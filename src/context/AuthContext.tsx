import { userService } from "@/src/api/user/user.service";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (document: string) => Promise<void>;
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load stored session
  useEffect(() => {
    const loadSession = async () => {
      const savedToken = await SecureStore.getItemAsync("token");
      const savedUser = await SecureStore.getItemAsync("user");

      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));

      setLoading(false);
    };

    loadSession();
  }, []);

  // LOGIN
  const login = async (document: string) => {
    try {
      // 1. Obtener usuario del backend
      const apiUser = await userService.getUser();

      // 2. Generar token fake
      const fakeToken = "token_" + new Date().getTime();

      // 3. Actualizar estados globales
      setUser(apiUser);
      setToken(fakeToken);

      // 4. Guardar en SecureStore
      await SecureStore.setItemAsync("token", fakeToken);
      await SecureStore.setItemAsync("user", JSON.stringify(apiUser));
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    setToken(null);
    setUser(null);

    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
