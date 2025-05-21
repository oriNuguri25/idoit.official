import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  Edit,
  Rocket,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateMain() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // step 1.
    title: "",
    duration: "",
    customDuration: "",
    coverImage: null as string | null,
    category: "",

    // step 2.
    motivation: "",
    worthTrying: "",
    hopeToGain: "",

    // step 3.
    resources: "",
    supportUsage: "",
    additionalInfo: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          coverImage: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      duration: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Challenge created: ", formData);
    // navigator("/");
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const steps = [
    {
      number: 1,
      title: "Challenge Basics",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      borderColor: "border-blue-500",
      lightBg: "bg-blue-50",
    },
    {
      number: 2,
      title: "Your Story",
      color: "bg-amber-500",
      textColor: "text-amber-600",
      borderColor: "border-amber-500",
      lightBg: "bg-amber-50",
    },
    {
      number: 3,
      title: "Support & Resources",
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-500",
      lightBg: "bg-emerald-50",
    },
    {
      number: 4,
      title: "Preview & Launch",
      color: "bg-purple-500",
      textColor: "text-purple-600",
      borderColor: "border-purple-500",
      lightBg: "bg-purple-50",
    },
  ];

  const currentStepInfo = steps[currentStep - 1];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <main className="flex-1">
        {/* 뒤로가기 */}
        <div className="max-w-[1400px] mx-auto px-3 relative">
          <Link
            to="/"
            className="inline-flex items-center text-zinc-600 hover:text-teal-600 transition-colors mt-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-sm md:text-base">Back to Experiments</span>
          </Link>
        </div>

        {/* Page Title */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 mb-2 md:mb-4">
            Start a New Challenges
          </h1>
          <p className="text-sm md:text-base text-zinc-600 max-w-3xl">
            Share your journey, document your process, and connect with others
            who appreciate the value of learning through experimentation.
          </p>
        </section>

        {/* Progress Steps */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 mb-8 md:mb-12">
          {/* 모바일 화면 */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-sm font-medium ${currentStepInfo.textColor}`}
              >
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm font-medium text-zinc-600">
                {currentStepInfo.title}
              </span>
            </div>
            <div className="relative h-2 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${currentStepInfo.color} transition-all duration-300 rounded-full`}
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 데스크탑 화면 */}
          <div className="hidden md:block max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                // Determine if step is active, completed, or upcoming
                const isCompleted = currentStep > step.number;
                const isActive = currentStep === step.number;
                const isUpcoming = currentStep < step.number;

                // Determine connector line status
                const showConnector = index < steps.length - 1;

                return (
                  <div key={step.number} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      {/* Step Circle */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 z-10 transition-all duration-300 ${
                          isCompleted
                            ? `${step.color} text-white`
                            : isActive
                            ? `border-2 ${step.borderColor} ${step.lightBg} ${step.textColor}`
                            : "bg-white border-2 border-zinc-200 text-zinc-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <span className="text-base font-semibold">
                            {step.number}
                          </span>
                        )}
                      </div>

                      {/* Step Title */}
                      <span
                        className={`text-sm font-medium text-center transition-colors duration-300 ${
                          isCompleted || isActive
                            ? step.textColor
                            : "text-zinc-400"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {/* Connector Line */}
                    {showConnector && (
                      <div className="absolute top-6 left-1/2 w-full h-0.5 bg-zinc-200 -z-10">
                        <div
                          className={`absolute top-0 left-0 h-full transition-all duration-500 ${step.color}`}
                          style={{
                            width: isCompleted ? "100%" : "0%",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 입력 폼 */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-16">
          <Card className="max-w-4xl mx-auto border border-zinc-200 shadow-sm">
            <CardContent className="p-5 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* step 1 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div
                      className={`p-4 rounded-lg ${currentStepInfo.lightBg} mb-6`}
                    >
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${currentStepInfo.textColor} mb-2`}
                      >
                        Step 1: Challenge Basics
                      </h2>
                      <p className="text-sm text-zinc-600">
                        Let users get started quickly with minimal friction.
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="title"
                        className="text-sm md:text-base font-medium"
                      >
                        Challenge Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Learn to play one ukulele song in 2 weeks"
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-sm md:text-base font-medium">
                        Estimated Duration
                      </Label>
                      <RadioGroup
                        value={formData.duration}
                        onValueChange={handleRadioChange}
                        className="mt-2 space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2 weeks" id="2weeks" />
                          <Label
                            htmlFor="2weeks"
                            className="font-normal cursor-pointer"
                          >
                            2 weeks
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1 month" id="1month" />
                          <Label
                            htmlFor="1month"
                            className="font-normal cursor-pointer"
                          >
                            1 month
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label
                            htmlFor="custom"
                            className="font-normal cursor-pointer"
                          >
                            Custom
                          </Label>
                        </div>
                      </RadioGroup>

                      {formData.duration === "custom" && (
                        <Input
                          name="customDuration"
                          value={formData.customDuration}
                          onChange={handleChange}
                          placeholder="e.g., 6 weeks, 3 months"
                          className="mt-3"
                        />
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="coverImage"
                        className="text-sm md:text-base font-medium"
                      >
                        Cover Image Upload
                      </Label>
                      <div className="mt-1.5">
                        {formData.coverImage ? (
                          <div className="relative h-[150px] sm:h-[200px] w-full rounded-lg overflow-hidden">
                            <img
                              src={formData.coverImage || "/placeholder.svg"}
                              alt="Cover image preview"
                              className="object-cover w-full h-full"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() =>
                                setFormData({ ...formData, coverImage: null })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-zinc-200 rounded-lg p-4 sm:p-6 text-center">
                            <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-zinc-400 mb-2" />
                            <p className="text-sm text-zinc-600 mb-2">
                              Drag and drop an image, or click to browse
                            </p>
                            <p className="text-xs text-zinc-500 mb-4">
                              Recommended size: 1200 x 600 pixels
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              asChild
                              size="sm"
                              className="mx-auto"
                            >
                              <label
                                htmlFor="image-upload"
                                className="cursor-pointer"
                              >
                                Select Image
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                />
                              </label>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="category"
                        className="text-sm md:text-base font-medium"
                      >
                        Category
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("category", value)
                        }
                      >
                        <SelectTrigger className="mt-1.5 w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="w-full">
                          <SelectItem value="creativity">Creativity</SelectItem>
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="social">
                            Social Experiment
                          </SelectItem>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="learning">Learning</SelectItem>
                          <SelectItem value="professional">
                            Professional
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 text-center italic text-sm text-zinc-600">
                      New here? Don't worry — a title and an image are enough to
                      begin.
                    </div>
                  </div>
                )}

                {/* step 2 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div
                      className={`p-4 rounded-lg ${currentStepInfo.lightBg} mb-6`}
                    >
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${currentStepInfo.textColor} mb-2`}
                      >
                        Step 2: Your Story
                      </h2>
                      <p className="text-sm text-zinc-600">
                        Draw out personal motivation and emotional connection.
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="motivation"
                        className="text-sm md:text-base font-medium"
                      >
                        Why are you doing this challege?
                      </Label>
                      <Textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Share what inspired you to take on this challenge..."
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="worthTrying"
                        className="text-sm md:text-base font-medium"
                      >
                        What makes this worth trying, even if you might fail?
                      </Label>
                      <Textarea
                        id="worthTrying"
                        name="worthTrying"
                        value={formData.worthTrying}
                        onChange={handleChange}
                        placeholder="Explain why this challenge matters to you regardless of the outcome..."
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="hopeToGain"
                        className="text-sm md:text-base font-medium"
                      >
                        What do you hope to gain by the end?
                      </Label>
                      <Textarea
                        id="hopeToGain"
                        name="hopeToGain"
                        value={formData.hopeToGain}
                        onChange={handleChange}
                        placeholder="Describe what success looks like for you in this challenge..."
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>

                    <div className="pt-4 text-center italic text-sm text-zinc-600">
                      We care more about your why than your win.
                      <br />
                      If it matters to you, that's enough.
                    </div>
                  </div>
                )}

                {/* step 3 */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div
                      className={`p-4 rounded-lg ${currentStepInfo.lightBg} mb-6`}
                    >
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${currentStepInfo.textColor} mb-2`}
                      >
                        Step 3: Support & Resources
                      </h2>
                      <p className="text-sm text-zinc-600">
                        Help users communicate needs clearly and honestly.
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="resources"
                        className="text-sm md:text-base font-medium"
                      >
                        What resources or materials will you need?
                      </Label>
                      <Textarea
                        id="resources"
                        name="resources"
                        value={formData.resources}
                        onChange={handleChange}
                        placeholder="List any tools, materials, or resources you'll need for this challenge..."
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="supportUsage"
                        className="text-sm md:text-base font-medium"
                      >
                        If you receive support, how will it be used?
                      </Label>
                      <Textarea
                        id="supportUsage"
                        name="supportUsage"
                        value={formData.supportUsage}
                        onChange={handleChange}
                        placeholder="Explain how any financial or material support will help you in this challenge..."
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="additionalInfo"
                        className="text-sm md:text-base font-medium"
                      >
                        Is there anything you'd like people to know as they
                        cheer you on?
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        placeholder="Share any additional context that would help supporters understand your journey..."
                        className="mt-1.5"
                        rows={4}
                      />
                    </div>

                    <div className="pt-4 text-center italic text-sm text-zinc-600">
                      People don't support perfection - they support sincerity.
                      <br />
                      Help others understand why this journey matters.
                    </div>
                  </div>
                )}

                {/* step 4 */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div
                      className={`p-4 rounded-lg ${currentStepInfo.lightBg} mb-6`}
                    >
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${currentStepInfo.textColor} mb-2`}
                      >
                        Step 4: Preview & Launch
                      </h2>
                      <p className="text-sm text-zinc-600">
                        Final review before sharing with the world.
                      </p>
                    </div>

                    {/* 미리보기 */}
                    <div className="space-y-8">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-blue-50 px-4 py-3 flex justify-between items-center">
                          <h3 className="font-medium text-blue-700">
                            Challenge Basics
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => goToStep(1)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                Title
                              </p>
                              <p className="font-medium">
                                {formData.title || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                Duration
                              </p>
                              <p className="font-medium">
                                {formData.duration === "custom"
                                  ? formData.customDuration ||
                                    "Custom (not specified)"
                                  : formData.duration || "Not selected"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                Category
                              </p>
                              <p className="font-medium">
                                {formData.duration === "custom"
                                  ? formData.customDuration ||
                                    "Custom (not specified)"
                                  : formData.duration || "Not selected"}
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-zinc-500 mb-1">
                                Cover Image
                              </p>
                              {formData.coverImage ? (
                                <div className="relative h-[120px] w-full md:w-1/2 rounded-lg overflow-hidden">
                                  <img
                                    src={
                                      formData.coverImage || "/placeholder.svg"
                                    }
                                    alt="Cover image preview"
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ) : (
                                <p className="text-zinc-600 italic">
                                  No image uploaded
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Story Preview */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-amber-50 px-4 py-3 flex justify-between items-center">
                          <h3 className="font-medium text-amber-700">
                            Your Story
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => goToStep(2)}
                            className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                Why are you doing this challenge?
                              </p>
                              <p className="text-zinc-700">
                                {formData.motivation || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                What makes this worth trying?
                              </p>
                              <p className="text-zinc-700">
                                {formData.worthTrying || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                What do you hope to gain?
                              </p>
                              <p className="text-zinc-700">
                                {formData.hopeToGain || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Support & Resources Preview */}
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-emerald-50 px-4 py-3 flex justify-between items-center">
                          <h3 className="font-medium text-emerald-700">
                            Support & Resources
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => goToStep(3)}
                            className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                Resources or materials needed
                              </p>
                              <p className="text-zinc-700">
                                {formData.resources || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                How support will be used
                              </p>
                              <p className="text-zinc-700">
                                {formData.supportUsage || "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-zinc-500 mb-1">
                                Additional information for supporters
                              </p>
                              <p className="text-zinc-700">
                                {formData.additionalInfo || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 text-center italic text-sm text-zinc-600 mb-6">
                      Perfect or not, you're already doing something bold.
                      <br />
                      Let's launch this — we're with you.
                    </div>
                  </div>
                )}

                {/* 버튼 */}
                <div className="pt-6 border-t border-zinc-100">
                  {/* 모바일 */}
                  <div className="flex flex-col gap-3 sm:hidden">
                    {currentStep === 4 ? (
                      <Button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 text-white w-full"
                      >
                        <Rocket className="h-4 w-4 mr-2" />
                        Launch Challenge
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className={`${currentStepInfo.color} hover:opacity-90 text-white w-full`}
                        onClick={nextStep}
                      >
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>

                  {/* 데스크탑 */}
                  <div className="hidden sm:flex justify-between">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous Step
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        className={`${currentStepInfo.color} hover:opacity-90 text-white`}
                        onClick={nextStep}
                      >
                        Next Step
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <Rocket className="h-4 w-4 mr-2" />
                        Launch Challenge
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
