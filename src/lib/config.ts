// API Configuration
export const API_CONFIG = {
  BASE_URL:
    process.env.NODE_ENV === "production"
      ? "https://your-production-api.com" // Change this when deploying to production
      : "http://localhost:5000", // Local development backend
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    USER: "/api/auth/user",
    GOOGLE_AUTH: "/api/auth/google",
    COMPLETE_ONBOARDING: "/api/auth/complete-onboarding",
    SKIP_ONBOARDING: "/api/auth/skip-onboarding",
    UPLOAD: "/api/upload",
  },
};

// Helper to build full API URLs
export const buildApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
