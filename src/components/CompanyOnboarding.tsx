import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  User,
  FileText,
  Check,
  Crown,
  Zap,
  Star,
  AlertCircle,
} from "lucide-react";
import { authService, CompanyOnboardingData } from "@/lib/auth";

interface CompanyOnboardingProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CompanyOnboarding = ({ onBack, onSuccess }: CompanyOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("professional");

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "Up to 50 quotes per month",
        "Basic templates",
        "Email support",
        "Basic analytics",
      ],
      icon: Zap,
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Most popular for growing businesses",
      features: [
        "Unlimited quotes",
        "Premium templates",
        "AI-powered suggestions",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
      ],
      icon: Crown,
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Multi-user accounts",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "White-label options",
      ],
      icon: Star,
      popular: false,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      const requiredFields = ["companyName", "ownerName", "email", "phone"];
      const missingFields = requiredFields.filter(
        (field) => !formData[field as keyof typeof formData]
      );

      if (missingFields.length > 0) {
        setError("Please fill in all required fields");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
    setError("");
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const onboardingData: CompanyOnboardingData = {
        ...formData,
        selectedPlan,
        planDetails: plans.find((p) => p.id === selectedPlan),
      };

      const result = await authService.completeOnboarding(onboardingData);

      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute left-4 top-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set Up Your Company
          </h1>
          <p className="text-gray-600">
            Step {currentStep} of 3 - Let's get your business profile ready
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex space-x-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="glass p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Step 1: Company Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Company Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="companyName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Company Name *
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="ownerName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Owner Name *
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Business Email *
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="business@company.com"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="website"
                    className="text-sm font-medium text-gray-700"
                  >
                    Website (Optional)
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourcompany.com"
                      className="glass-card border-0 pl-10 pr-4 py-3"
                    />
                    <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Description (Optional)
                </Label>
                <div className="mt-1 relative">
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your business..."
                    className="glass-card border-0 pl-10 pr-4 py-3 min-h-[100px]"
                  />
                  <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Choose Your Plan
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <Card
                      key={plan.id}
                      className={`relative p-6 cursor-pointer transition-all duration-200 ${
                        selectedPlan === plan.id
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : "hover:shadow-lg"
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                          Most Popular
                        </Badge>
                      )}

                      <div className="text-center">
                        <Icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {plan.name}
                        </h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-gray-600">{plan.period}</span>
                        </div>
                        <p className="text-gray-600 mb-6">{plan.description}</p>

                        <ul className="space-y-2 text-sm text-gray-700">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Payment (Dummy) */}
          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Payment Setup
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Demo Mode - Payment Integration Coming Soon!
                </h3>
                <p className="text-yellow-700">
                  For now, we'll set up your account with the selected plan.
                  Payment processing will be integrated in the next update.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">
                      {plans.find((p) => p.id === selectedPlan)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">
                      {plans.find((p) => p.id === selectedPlan)?.price}/month
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>
                        {plans.find((p) => p.id === selectedPlan)?.price}/month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onBack : handlePrevStep}
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? "Back to Options" : "Previous"}
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNextStep}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                disabled={loading}
              >
                Continue
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={loading}
              >
                {loading ? "Setting up..." : "Complete Setup"}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
