import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  FileText,
  CheckCircle,
  ArrowRight,
  Camera,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

const Onboarding = () => {
  const navigate = useNavigate();
  const { refreshUser, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [formData, setFormData] = useState({
    // Business Info
    company_name: "",
    owner_name: user?.full_name || "",
    email: user?.email || "",
    phone: "",
    website: "",
    description: "",
    logo_url: "",
    pricing_document_url: "",
  });

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

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "document"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isLogo = type === "logo";
    const setUploading = isLogo ? setUploadingLogo : setUploadingDocument;

    setUploading(true);
    setError("");

    try {
      const result = await authService.uploadFile(file, type);

      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setFormData((prev) => ({
          ...prev,
          [isLogo ? "logo_url" : "pricing_document_url"]: result.url,
        }));
      }
    } catch (err) {
      setError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < 3) {
      // Validate required fields for step 1
      if (currentStep === 1) {
        const requiredFields = ["company_name", "owner_name", "email", "phone"];
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

      setCurrentStep(currentStep + 1);
      setError("");
    } else {
      // Complete onboarding
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await authService.completeOnboarding(formData);

      if (result.error) {
        setError(result.error);
      } else {
        // Refresh user data to get updated company info
        await refreshUser();
        navigate("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinExisting = async () => {
    if (!formData.email) {
      setError("Please enter the company email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await authService.joinCompany(formData.email);

      if (result.error) {
        setError(result.error);
      } else {
        // Refresh user data to get updated company info
        await refreshUser();
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to join company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Business Information",
      description: "Tell us about your company",
    },
    {
      number: 2,
      title: "Upload Files",
      description: "Add your logo and pricing document",
    },
    {
      number: 3,
      title: "Setup Complete",
      description: "You're ready to start!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="fixed top-0 w-full z-50 glass border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold gradient-text">NailedIt</span>
            </div>
            <div className="text-sm text-gray-600">Step {currentStep} of 3</div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step.number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-4 hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {step.description}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-16 h-0.5 bg-gray-200 ml-8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 max-w-2xl mx-auto">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <Card className="glass p-8 animate-fade-in">
                <div className="text-center mb-8">
                  <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Tell us about your business
                  </h2>
                  <p className="text-gray-600">
                    We'll use this information to personalize your experience
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="company_name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Name *
                    </Label>
                    <div className="mt-1 relative">
                      <Input
                        id="company_name"
                        name="company_name"
                        type="text"
                        required
                        value={formData.company_name}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="glass-card border-0 pl-10 pr-4 py-3"
                      />
                      <Building className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="owner_name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Owner Name *
                    </Label>
                    <div className="mt-1 relative">
                      <Input
                        id="owner_name"
                        name="owner_name"
                        type="text"
                        required
                        value={formData.owner_name}
                        onChange={handleInputChange}
                        placeholder="Your Full Name"
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
                        placeholder="contact@yourcompany.com"
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

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Business Description (Optional)
                    </Label>
                    <div className="mt-1">
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us about your business and the services you provide..."
                        className="glass-card border-0 p-3"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Join Existing Company Option */}
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Already part of a company?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If your company is already using NailedIt, you can join them
                    instead.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleJoinExisting}
                    disabled={loading || !formData.email}
                    className="w-full"
                  >
                    {loading ? "Joining..." : "Join Existing Company"}
                  </Button>
                </div>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="glass p-8 animate-fade-in">
                <div className="text-center mb-8">
                  <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload Your Files
                  </h2>
                  <p className="text-gray-600">
                    Add your company logo and pricing document to get started
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Logo Upload */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">
                      Company Logo (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      {formData.logo_url ? (
                        <div className="space-y-4">
                          <img
                            src={formData.logo_url}
                            alt="Company Logo"
                            className="w-24 h-24 object-contain mx-auto rounded-lg"
                          />
                          <p className="text-sm text-green-600">
                            Logo uploaded successfully!
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, logo_url: "" }))
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Upload your company logo
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "logo")}
                            className="hidden"
                            id="logo-upload"
                            disabled={uploadingLogo}
                          />
                          <label htmlFor="logo-upload">
                            <Button
                              type="button"
                              variant="outline"
                              disabled={uploadingLogo}
                              asChild
                            >
                              <span>
                                {uploadingLogo ? "Uploading..." : "Choose File"}
                              </span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Document Upload */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">
                      Pricing Document (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      {formData.pricing_document_url ? (
                        <div className="space-y-4">
                          <FileText className="w-12 h-12 text-green-600 mx-auto" />
                          <p className="text-sm text-green-600">
                            Document uploaded successfully!
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                pricing_document_url: "",
                              }))
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Upload your pricing document
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, DOCX, XLS, XLSX up to 10MB
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                            onChange={(e) => handleFileUpload(e, "document")}
                            className="hidden"
                            id="document-upload"
                            disabled={uploadingDocument}
                          />
                          <label htmlFor="document-upload">
                            <Button
                              type="button"
                              variant="outline"
                              disabled={uploadingDocument}
                              asChild
                            >
                              <span>
                                {uploadingDocument
                                  ? "Uploading..."
                                  : "Choose File"}
                              </span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="glass p-8 animate-fade-in text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  You're All Set!
                </h2>
                <p className="text-gray-600 mb-8">
                  Your account has been created and your business information
                  has been saved. You can now start creating professional quotes
                  with NailedIt.
                </p>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    What's Next?
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Explore your dashboard and settings</li>
                    <li>• Create your first professional quote</li>
                    <li>• Add team members to your company</li>
                    <li>• Customize your quote templates</li>
                  </ul>
                </div>
              </Card>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 max-w-2xl mx-auto">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="glass-card border-0"
              >
                Back
              </Button>
            )}

            <div className="ml-auto">
              <Button
                type="button"
                onClick={handleNext}
                disabled={loading || uploadingLogo || uploadingDocument}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white glass-button"
              >
                {loading ? (
                  "Processing..."
                ) : currentStep === 3 ? (
                  <>
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
