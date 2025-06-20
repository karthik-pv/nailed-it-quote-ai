import { API_CONFIG, buildApiUrl } from "./config";

export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  company_id?: string;
  onboarding_completed?: boolean;
}

export interface AuthResponse {
  user: User | null;
  session?: any;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  fullName?: string;
}

export interface CompanyOnboardingData {
  companyName: string;
  ownerName: string;
  email: string;
  phone: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  pricingDocumentUrl?: string;
  selectedPlan?: string;
  planDetails?: any;
}

class AuthService {
  private user: User | null = null;
  private token: string | null = null;

  constructor() {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }

    if (storedToken) {
      this.token = storedToken;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Handle successful login
      if (data.user) {
        this.user = data.user;
        this.token = data.session?.access_token || data.access_token;

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        if (this.token) {
          localStorage.setItem("token", this.token);
        }
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.SIGNUP), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Handle successful signup
      if (data.user) {
        this.user = data.user;
        this.token = data.session?.access_token || data.access_token;

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        if (this.token) {
          localStorage.setItem("token", this.token);
        }
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error.message : "Signup failed",
      };
    }
  }

  async completeOnboarding(
    companyData: CompanyOnboardingData
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.COMPLETE_ONBOARDING),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(companyData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Onboarding failed");
      }

      // Update user data with company information
      if (data.user) {
        this.user = data.user;
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Onboarding error:", error);
      return {
        user: null,
        session: null,
        error: error instanceof Error ? error.message : "Onboarding failed",
      };
    }
  }

  async skipOnboarding(): Promise<AuthResponse> {
    try {
      const response = await fetch(
        buildApiUrl(API_CONFIG.ENDPOINTS.SKIP_ONBOARDING),
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to skip onboarding");
      }

      // Update user data
      if (data.user) {
        this.user = data.user;
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return {
        user: data.user,
        session: null,
      };
    } catch (error) {
      console.error("Skip onboarding error:", error);
      return {
        user: this.user,
        session: null,
        error:
          error instanceof Error ? error.message : "Failed to skip onboarding",
      };
    }
  }

  async uploadFile(
    file: File,
    fileType: string = "document"
  ): Promise<{ url?: string; error?: string }> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", fileType);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.UPLOAD), {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "File upload failed");
      }

      return { url: data.url };
    } catch (error) {
      console.error("File upload error:", error);
      return {
        error: error instanceof Error ? error.message : "File upload failed",
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.LOGOUT), {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of API call success
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }

  async getCurrentUserFromAPI(): Promise<User | null> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          this.user = data.user;
          localStorage.setItem("user", JSON.stringify(data.user));
          return data.user;
        }
      }
    } catch (error) {
      console.error("Get current user error:", error);
    }

    return null;
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  needsOnboarding(): boolean {
    return this.user ? !this.user.onboarding_completed : false;
  }

  hasCompany(): boolean {
    return this.user ? !!this.user.company_id : false;
  }

  // Helper method for authenticated API calls
  async fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  }
}

export const authService = new AuthService();
