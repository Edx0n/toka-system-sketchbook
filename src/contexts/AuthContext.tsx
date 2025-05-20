
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - in a real app, validate credentials with a backend
      if (email === "admin@toka.com" && password === "password") {
        const userData = {
          id: "1",
          name: "Admin User",
          email: "admin@toka.com"
        };
        
        setUser(userData);
        localStorage.setItem("toka-user", JSON.stringify(userData));
        toast.success("Login bem sucedido!");
        navigate("/dashboard");
      } else {
        toast.error("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao tentar fazer login.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("toka-user");
    navigate("/");
    toast.success("Sessão encerrada com sucesso.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
