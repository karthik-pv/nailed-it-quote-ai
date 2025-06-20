import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, User, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/lib/auth";

interface OnboardingChoiceProps {
  onCreateCompany: () => void;
  onSkipOnboarding: () => void;
}

const OnboardingChoice = ({
  onCreateCompany,
  onSkipOnboarding,
}: OnboardingChoiceProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSkipOnboarding = async () => {
    setLoading(true);
    try {
      const result = await authService.skipOnboarding();
      if (result.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to skip onboarding:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NailedIt! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your account has been created successfully. Choose how you'd like to
            get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create Company Option */}
          <Card className="p-8 glass hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Create Your Company
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Set up your company profile, choose a subscription plan, and
                unlock all features including AI-powered quote generation and
                customer management.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  AI-powered quote generation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Customer relationship management
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Advanced analytics & reporting
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Professional templates
                </div>
              </div>

              <Button
                onClick={onCreateCompany}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold shadow-lg"
                disabled={loading}
              >
                Create Company
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Skip Option */}
          <Card className="p-8 glass hover:shadow-xl transition-all duration-300 border-2 hover:border-gray-200">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Continue as Individual
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Skip company setup for now and explore the platform with basic
                features. You can always create your company profile later.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Basic quote creation
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Limited templates
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Personal dashboard
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Upgrade anytime
                </div>
              </div>

              <Button
                onClick={handleSkipOnboarding}
                variant="outline"
                className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-3 text-lg font-semibold"
                disabled={loading}
              >
                {loading ? "Setting up..." : "Skip for Now"}
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Don't worry - you can always upgrade or create your company profile
            later from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingChoice;
