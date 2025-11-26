import { userService } from "@/src/api/user/user.service";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  selectedPlan: any;
  login: (document: string, phoneNumber?: string, documentType?: string) => Promise<void>;
  logout: () => Promise<void>;
  setSelectedPlan: (plan: any) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  selectedPlan: null,
  login: async () => {},
  logout: async () => {},
  setSelectedPlan: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
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
  const login = async (document: string, phoneNumber?: string, documentType?: string) => {
    try {
      const apiUser = await userService.getUser();

      const userWithFormData = {
        ...apiUser,
        documentNumber: document,
        phoneNumber: phoneNumber,
        documentType: documentType
      };

      const fakeToken = "token_" + new Date().getTime();

      setUser(userWithFormData);
      setToken(fakeToken);

      await SecureStore.setItemAsync("token", fakeToken);
      await SecureStore.setItemAsync("user", JSON.stringify(userWithFormData));
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
    <AuthContext.Provider value={{ user, token, selectedPlan, login, logout, setSelectedPlan, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
