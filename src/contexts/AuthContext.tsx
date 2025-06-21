import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  needsOnboarding: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // Check if user is stored locally
        const currentUser = authService.getCurrentUser();
        if (currentUser && authService.getToken()) {
          // Try to refresh user data from API
          const refreshedUser = await authService.getCurrentUserFromAPI();
          if (refreshedUser) {
            setUser(refreshedUser);
          } else {
            // Token might be expired, use local data
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid auth state
        await authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login({ email, password });
      if (result.user && !result.error) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, error: result.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const result = await authService.signup({
        email,
        password,
        full_name: fullName,
      });
      if (result.user && !result.error) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, error: result.error || "Signup failed" };
      }
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const refreshedUser = await authService.getCurrentUserFromAPI();
      if (refreshedUser) {
        setUser(refreshedUser);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    needsOnboarding: !!user && !user.company_id,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
