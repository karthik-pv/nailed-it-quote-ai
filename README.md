# NailedIt Quote AI - Frontend

A modern React application for creating professional quotes with AI assistance, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Authentication System**: Secure login/signup with JWT tokens
- **Company Onboarding**: Multi-step onboarding process for business setup
- **File Uploads**: Logo and document upload functionality
- **Protected Routes**: Automatic authentication checks and redirects
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience
- **State Management**: Context-based authentication state management

## 📁 Project Structure

```
nailed-it-quote-ai/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── AIGuide.tsx         # AI guidance component
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/
│   │   ├── auth.ts            # Authentication service
│   │   ├── config.ts          # API configuration
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── Login.tsx          # Login page
│   │   ├── SignUp.tsx         # Registration page
│   │   ├── Onboarding.tsx     # Company onboarding
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── Quotes.tsx         # Quotes management
│   │   ├── Customers.tsx      # Customer management
│   │   ├── Schedule.tsx       # Schedule management
│   │   ├── Settings.tsx       # Settings page
│   │   └── NotFound.tsx       # 404 page
│   └── App.tsx                # Main app component
├── .env                       # Environment variables
├── .env.example              # Environment template
└── package.json              # Dependencies
```

## 🛠️ Prerequisites

- Node.js 18+ and npm/yarn
- Backend API server running (see backend README)

## ⚡ Quick Start

1. **Install Dependencies**

   ```bash
   cd nailed-it-quote-ai
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APP_NAME=NailedIt Quote AI
   VITE_APP_VERSION=1.0.0
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - Make sure backend is running on http://localhost:5000

## 🔧 Backend Integration

The frontend is designed to work seamlessly with the Flask backend. Key integration points:

### Authentication Flow

1. **Login/Signup**: Uses `/auth/signin` and `/auth/signup` endpoints
2. **Token Management**: Stores JWT tokens in localStorage
3. **Auto-refresh**: Automatically refreshes user data on app load
4. **Logout**: Calls `/auth/signout` and clears local storage

### Onboarding Process

1. **Company Setup**: Collects business information
2. **File Uploads**: Handles logo and document uploads
3. **Company Creation**: Creates company via `/onboarding/complete`
4. **Join Existing**: Allows joining existing companies

### Protected Routes

- All dashboard routes require authentication
- Automatic redirect to login if not authenticated
- Automatic redirect to onboarding if setup incomplete

## 🎨 UI Components

The application uses a modern design system with:

- **Shadcn/ui**: High-quality React components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, customizable icons
- **Glass Morphism**: Modern glass-like UI effects
- **Responsive Design**: Mobile-first approach

## 🔐 Authentication System

### AuthContext

Provides global authentication state:

```typescript
const { user, login, signup, logout, loading } = useAuth();
```

### AuthService

Handles all authentication operations:

- Login/Signup with email and password
- Token management and storage
- File upload functionality
- User data refresh
- Logout and cleanup

### ProtectedRoute

Wrapper component for protected pages:

```typescript
<ProtectedRoute requireOnboarding={true}>
  <Dashboard />
</ProtectedRoute>
```

## 📝 API Integration

### Configuration

API settings in `src/lib/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  TIMEOUT: 30000,
};
```

### Endpoints

All API endpoints are centrally defined:

- Authentication: `/auth/*`
- Onboarding: `/onboarding/*`
- File uploads: `/files/upload/*`
- User management: `/users/*`
- Company management: `/companies/*`

## 🔄 State Management

### Authentication State

- User information and authentication status
- Company data and onboarding status
- Loading states and error handling

### Local Storage

- `nailedit_user`: User data
- `nailedit_token`: JWT authentication token

## 🚦 Navigation Flow

1. **Landing Page** (`/`) - Marketing and signup
2. **Authentication** (`/login`, `/signup`) - User authentication
3. **Onboarding** (`/onboarding`) - Company setup (if needed)
4. **Dashboard** (`/dashboard`) - Main application interface
5. **Protected Pages** - Quotes, customers, schedule, settings

## 🎯 Key Features

### Multi-step Onboarding

- Business information collection
- Logo and document upload
- Company creation or joining
- Progress tracking and validation

### File Upload System

- Drag-and-drop interface
- File type validation
- Upload progress indication
- Error handling and retry

### Responsive Dashboard

- Mobile-friendly sidebar
- Real-time statistics
- Quick actions and navigation
- User profile integration

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent naming conventions

## 🚀 Production Deployment

1. **Build Application**

   ```bash
   npm run build
   ```

2. **Environment Variables**
   Update production API URL:

   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

3. **Deploy to Hosting**
   - Vercel, Netlify, or any static hosting
   - Ensure backend CORS is configured for your domain

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Failed**

   - Check backend server is running
   - Verify API_URL in .env file
   - Check network connectivity

2. **Authentication Issues**

   - Clear localStorage: `localStorage.clear()`
   - Check token expiration
   - Verify backend authentication endpoints

3. **File Upload Failures**

   - Check file size limits
   - Verify file type restrictions
   - Check backend storage configuration

4. **Routing Issues**
   - Ensure all routes are defined in App.tsx
   - Check ProtectedRoute configuration
   - Verify authentication state

### Debug Mode

Enable debug logging:

```typescript
// In AuthContext.tsx
console.log("Auth state:", { user, loading, token });
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the backend README for API documentation
- Review the troubleshooting section
- Check browser console for error messages
- Ensure backend and frontend versions are compatible
