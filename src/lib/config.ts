// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  TIMEOUT: 30000, // 30 seconds
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  LOGIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  LOGOUT: "/auth/signout",
  USER: "/auth/user",

  // Onboarding
  COMPLETE_ONBOARDING: "/onboarding/complete",
  JOIN_COMPANY: "/onboarding/join",

  // File uploads
  UPLOAD_LOGO: "/files/upload/logo",
  UPLOAD_DOCUMENT: "/files/upload/document",

  // Company management
  COMPANIES: "/companies",
  COMPANY_USERS: "/companies/users",

  // User management
  USERS: "/users",
  USER_PROFILE: "/users/profile",

  // Health check
  HEALTH: "/health",
};

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || "NailedIt Quote AI",
  VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

// Helper to build full API URLs
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
