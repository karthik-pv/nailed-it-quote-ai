import { API_CONFIG, ENDPOINTS, buildApiUrl } from "./config";

export interface User {
  id: string;
  email: string;
  full_name: string;
  company_id?: string;
  role?: string;
  created_at: string;
  updated_at?: string;
  company?: {
    id: string;
    company_name: string;
    owner_name: string;
    email: string;
    phone: string;
    website?: string;
    description?: string;
    logo_url?: string;
    pricing_document_url?: string;
    created_at: string;
    updated_at: string;
  };
}

export interface AuthResponse {
  user: User | null;
  session?: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    expires_in: number;
    token_type: string;
  };
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  full_name: string;
}

export interface CompanyOnboardingData {
  company_name: string;
  owner_name: string;
  email: string;
  phone: string;
  website?: string;
  description?: string;
  logo_url?: string;
  pricing_document_url?: string;
}

class AuthService {
  private user: User | null = null;
  private token: string | null = null;

  constructor() {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem("nailedit_user");
    const storedToken = localStorage.getItem("nailedit_token");

    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem("nailedit_user");
      }
    }

    if (storedToken) {
      this.token = storedToken;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(buildApiUrl(ENDPOINTS.LOGIN), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          user: null,
          error: data.error || "Login failed",
        };
      }

      // Handle successful login - backend returns { message, user }
      if (data.user) {
        this.user = data.user.user || data.user; // Handle nested user object
        this.token =
          data.user.session?.access_token || data.session?.access_token;

        // Store in localStorage
        localStorage.setItem("nailedit_user", JSON.stringify(this.user));
        if (this.token) {
          localStorage.setItem("nailedit_token", this.token);
        }

        return {
          user: this.user,
          session: data.user.session || data.session,
        };
      }

      return {
        user: null,
        error: "Invalid response from server",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        user: null,
        error:
          error instanceof Error ? error.message : "Network error occurred",
      };
    }
  }

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(buildApiUrl(ENDPOINTS.SIGNUP), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          user: null,
          error: data.error || "Signup failed",
        };
      }

      // Handle successful signup - backend returns { message, user }
      if (data.user) {
        this.user = data.user.user || data.user; // Handle nested user object
        this.token =
          data.user.session?.access_token || data.session?.access_token;

        // Store in localStorage
        localStorage.setItem("nailedit_user", JSON.stringify(this.user));
        if (this.token) {
          localStorage.setItem("nailedit_token", this.token);
        }

        return {
          user: this.user,
          session: data.user.session || data.session,
        };
      }

      return {
        user: null,
        error: "Invalid response from server",
      };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        user: null,
        error:
          error instanceof Error ? error.message : "Network error occurred",
      };
    }
  }

  async completeOnboarding(
    companyData: CompanyOnboardingData
  ): Promise<AuthResponse> {
    try {
      if (!this.token) {
        return {
          user: null,
          error: "Authentication required",
        };
      }

      const response = await fetch(buildApiUrl(ENDPOINTS.COMPLETE_ONBOARDING), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(companyData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          user: null,
          error: data.error || "Onboarding failed",
        };
      }

      // Update user data with company information
      if (data.user) {
        this.user = data.user;
        localStorage.setItem("nailedit_user", JSON.stringify(this.user));
      }

      return {
        user: this.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Onboarding error:", error);
      return {
        user: null,
        error:
          error instanceof Error ? error.message : "Network error occurred",
      };
    }
  }

  async joinCompany(companyEmail: string): Promise<AuthResponse> {
    try {
      if (!this.token) {
        return {
          user: null,
          error: "Authentication required",
        };
      }

      const response = await fetch(buildApiUrl(ENDPOINTS.JOIN_COMPANY), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ company_email: companyEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          user: null,
          error: data.error || "Failed to join company",
        };
      }

      // Update user data
      if (data.company) {
        // Refresh user data
        const userResult = await this.getCurrentUserFromAPI();
        if (userResult) {
          this.user = userResult;
          localStorage.setItem("nailedit_user", JSON.stringify(this.user));
        }
      }

      return {
        user: this.user,
        session: data.session,
      };
    } catch (error) {
      console.error("Join company error:", error);
      return {
        user: null,
        error:
          error instanceof Error ? error.message : "Network error occurred",
      };
    }
  }

  async uploadFile(
    file: File,
    fileType: string = "document"
  ): Promise<{ url?: string; error?: string }> {
    try {
      if (!this.token) {
        return { error: "Authentication required" };
      }

      const formData = new FormData();
      formData.append("file", file);

      const endpoint =
        fileType === "logo" ? ENDPOINTS.UPLOAD_LOGO : ENDPOINTS.UPLOAD_DOCUMENT;

      const response = await fetch(buildApiUrl(endpoint), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "File upload failed" };
      }

      return { url: data.url };
    } catch (error) {
      console.error("File upload error:", error);
      return {
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.token) {
        await fetch(buildApiUrl(ENDPOINTS.LOGOUT), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of API call success
      this.user = null;
      this.token = null;
      localStorage.removeItem("nailedit_user");
      localStorage.removeItem("nailedit_token");
    }
  }

  async getCurrentUserFromAPI(): Promise<User | null> {
    try {
      if (!this.token) {
        return null;
      }

      const response = await fetch(buildApiUrl(ENDPOINTS.USER), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        // Token might be expired, clear local storage
        this.logout();
        return null;
      }

      const data = await response.json();
      return data.user || null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.user && !!this.token;
  }

  needsOnboarding(): boolean {
    return this.isAuthenticated() && !this.user?.company_id;
  }

  hasCompany(): boolean {
    return !!this.user?.company_id;
  }

  async fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${this.token}`,
    };

    return fetch(url, {
      ...options,
      headers,
    });
  }
}

export const authService = new AuthService();
