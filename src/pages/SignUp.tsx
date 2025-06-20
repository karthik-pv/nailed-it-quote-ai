
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Check, 
  Crown, 
  Zap,
  Star,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small contractors getting started",
      features: [
        "Up to 50 quotes per month",
        "Basic AI quote generation",
        "Email support",
        "Customer management",
        "Mobile app access"
      ],
      popular: false
    },
    {
      id: "professional",
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for growing fencing businesses",
      features: [
        "Unlimited quotes",
        "Advanced AI training",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
        "Custom branding",
        "API access"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large-scale operations",
      features: [
        "Everything in Professional",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
        "On-site training"
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Implement actual signup with Supabase
    navigate('/dashboard');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth with Supabase
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-white/50 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold gradient-text">NailedIt</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 hover:bg-white/50 shadow-sm"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* User Registration Form */}
          <div className="max-w-md mx-auto mb-12 animate-fade-in">
            <Card className="glass p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Get started with NailedIt today</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@company.com"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      className="glass-card border-0 pl-10 pr-12 py-3"
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 shadow-sm"
                >
                  Create Account
                </Button>
              </form>

              {/* Divider */}
              <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Google Sign Up */}
              <Button 
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                className="w-full glass-card border-0 py-3 text-gray-700 hover:text-gray-900 shadow-sm"
              >
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google" 
                  className="w-5 h-5 mr-3"
                />
                Continue with Google
              </Button>
            </Card>
          </div>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Choose Your Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan for your fencing business and start generating 
              professional quotes with AI today.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={plan.id}
                className={`glass-card p-8 cursor-pointer transition-all duration-300 relative animate-slide-up ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-blue-500 glass' 
                    : 'hover:glass'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    {plan.id === 'enterprise' ? (
                      <Crown className="w-8 h-8 text-purple-600" />
                    ) : (
                      <Zap className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full shadow-sm ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                      : 'glass-button text-gray-700 hover:text-blue-700'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
