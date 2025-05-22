import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const STORY_QUESTIONS = [
  {
    emoji: "💡",
    question: "What inspired you to try this challenge?",
    name: "motivation",
    placeholder: "e.g. I've always wanted to try this!",
  },
  {
    emoji: "🎯",
    question: "Is there something you want to achieve or prove?",
    name: "goal",
    placeholder: "e.g. I want to show myself I can finish what I start.",
  },
  {
    emoji: "🤝",
    question: "Any support or resources you're looking for?",
    name: "support",
    placeholder: "e.g. Even a little encouragement or feedback helps!",
  },
];

const CATEGORIES = [
  { value: "creativity", label: "Creativity" },
  { value: "tech", label: "Tech" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "social", label: "Social Experiment" },
  { value: "fitness", label: "Fitness" },
  { value: "learning", label: "Learning" },
  { value: "professional", label: "Professional" },
  { value: "other", label: "Other" },
];

export default function CreateMain() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    category: "",
    coverImage: [] as string[],
    story: ["", "", ""],
  });
  const [storyIdx, setStoryIdx] = useState(0);
  const [imageUploading, setImageUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => ({
          ...prev,
          coverImage:
            prev.coverImage.length < 3 && e.target?.result
              ? [...prev.coverImage, e.target.result as string]
              : prev.coverImage,
        }));
        setImageUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Step1 input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step2 story answer handler
  const handleStoryChange = (v: string) => {
    setForm((prev) => {
      const next = [...prev.story];
      next[storyIdx] = v;
      return { ...prev, story: next };
    });
  };

  // Step2 skip
  const handleSkip = () => {
    if (storyIdx < STORY_QUESTIONS.length - 1) setStoryIdx(storyIdx + 1);
  };

  // Step2 next
  const handleNextStory = () => {
    if (storyIdx < STORY_QUESTIONS.length - 1) setStoryIdx(storyIdx + 1);
    else setSubmitted(true);
  };

  // Step1 complete condition
  const canProceed =
    form.title && form.duration && form.category && form.coverImage.length > 0;

  // After submit: preview/share
  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-50 to-zinc-50">
        <main className="flex-1 flex flex-col items-center justify-center">
          <Card className="w-full max-w-none md:max-w-[700px] mx-auto border-0 shadow-2xl rounded-3xl p-4 md:p-12 text-center animate-fade-in bg-white/90">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
              {/* 이미지: 왼쪽(PC) / 상단(모바일) */}
              <div className="flex-shrink-0 w-full md:w-72 flex justify-center items-center">
                <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                  {form.coverImage.length > 0 ? (
                    form.coverImage.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`cover ${idx + 1}`}
                        className="aspect-square w-full md:w-80 max-w-xs h-auto object-cover rounded-2xl border-4 border-teal-100 shadow-lg"
                      />
                    ))
                  ) : (
                    <img
                      src="/placeholder.svg"
                      alt="cover"
                      className="aspect-square w-full md:w-80 max-w-xs h-auto object-cover rounded-2xl border-4 border-teal-100 shadow-lg"
                    />
                  )}
                </div>
              </div>
              {/* 정보/메시지/버튼: 오른쪽(PC) / 하단(모바일) */}
              <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <span className="text-5xl md:text-6xl mb-2">🎉</span>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-1 text-teal-600 drop-shadow">
                  Challenge Submitted!
                </h2>
                <p className="mb-2 text-zinc-600 text-base md:text-lg">
                  Your journey starts now. The Idoit community is cheering for
                  you!
                </p>
                <div className="mb-4 mt-2">
                  <span className="font-bold text-xl md:text-2xl text-zinc-800">
                    {form.title}
                  </span>
                  <span className="text-zinc-500 ml-2">
                    ({form.duration},{" "}
                    {CATEGORIES.find((c) => c.value === form.category)?.label})
                  </span>
                </div>
                <ul className="mb-6 text-left text-zinc-700 w-full max-w-none md:max-w-md mx-auto">
                  {form.story.map(
                    (s, i) =>
                      s && (
                        <li
                          key={i}
                          className="mb-1 text-base md:text-lg flex items-center gap-2"
                        >
                          <span>{STORY_QUESTIONS[i].emoji}</span>{" "}
                          <span>{s}</span>
                        </li>
                      )
                  )}
                </ul>
                <div className="mb-6 text-teal-500 font-semibold text-lg md:text-xl animate-fade-in">
                  You did it! Ready for your next adventure?
                </div>
                <Button
                  className="w-full max-w-xs mx-auto bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg py-3 shadow-lg transition-all"
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans">
      <main className="flex-1 flex flex-col items-center justify-center py-4 px-2 md:px-0">
        {/* Back button */}
        <div className="w-full max-w-none md:max-w-[1400px] mx-auto mb-4 px-2">
          <Link
            to="/"
            className="inline-flex items-center text-zinc-600 hover:text-teal-600 transition-colors text-sm md:text-base"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Experiments
          </Link>
        </div>
        <Card className="w-full max-w-none md:max-w-[1400px] mx-auto border border-zinc-200 shadow-md rounded-2xl animate-fade-in">
          <CardContent className="p-4 md:p-16">
            {/* Step 1: minimal info */}
            {step === 1 && (
              <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-24 items-stretch">
                {/* Form section */}
                <div className="flex-1 min-w-0 w-full max-w-none md:max-w-xl mx-auto flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-teal-500 font-bold text-base md:text-lg">
                        Step 1
                      </span>
                      <span className="text-zinc-400 text-base md:text-lg">
                        / 2
                      </span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-teal-400 transition-all duration-500 rounded-full"
                        style={{ width: "50%" }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                      Start a Challenge
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base">
                      Don't hesitate—just start!
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-base font-medium">
                        Challenge Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Learn to play one ukulele song in 2 weeks"
                        className="mt-1.5 text-base md:text-lg"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-base font-medium">Duration</Label>
                      <Select
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, duration: v }))
                        }
                      >
                        <SelectTrigger className="mt-1.5 w-full text-base md:text-lg">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="w-full">
                          <SelectItem value="1 week">1 week</SelectItem>
                          <SelectItem value="2 weeks">2 weeks</SelectItem>
                          <SelectItem value="1 month">1 month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Category</Label>
                      <Select
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, category: v }))
                        }
                      >
                        <SelectTrigger className="mt-1.5 w-full text-base md:text-lg">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="w-full">
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Cover Image: 좌측 정렬, 업로드 아래에 썸네일, 삭제는 빨간 X */}
                    <div className="pt-2">
                      <div className="w-full md:w-[420px]">
                        <Label className="text-base font-medium mb-2">
                          Cover Image (up to 3)
                        </Label>
                        {/* 업로드 버튼 + 제출한 사진 썸네일: 한 줄에 나란히 */}
                        <div className="flex gap-2 mt-2 items-center">
                          {form.coverImage.length < 3 && (
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-teal-200 rounded-xl h-24 w-24 md:h-32 md:w-32 cursor-pointer hover:bg-teal-50 transition-colors">
                              <Upload className="h-8 w-8 text-teal-400 mb-1" />
                              <span className="text-zinc-400 text-xs">
                                Upload Image
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </label>
                          )}
                          {form.coverImage.map((img, idx) => (
                            <div
                              key={idx}
                              className="relative h-24 w-24 md:h-32 md:w-32 rounded-xl overflow-hidden group"
                            >
                              <img
                                src={img}
                                alt={`cover preview ${idx + 1}`}
                                className="object-cover w-full h-full"
                              />
                              <button
                                type="button"
                                aria-label="Remove image"
                                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 shadow hover:bg-red-600"
                                onClick={() =>
                                  setForm((f) => ({
                                    ...f,
                                    coverImage: f.coverImage.filter(
                                      (_, i) => i !== idx
                                    ),
                                  }))
                                }
                              >
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        {imageUploading && (
                          <div className="text-xs text-teal-500 mt-1 animate-pulse">
                            Uploading image...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg py-3 transition-all disabled:opacity-50 md:mt-8"
                    disabled={!canProceed}
                    onClick={() => setStep(2)}
                  >
                    Start challenge
                  </Button>
                </div>
              </div>
            )}
            {/* Step 2: story */}
            {step === 2 && (
              <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-stretch">
                {/* Main Q&A */}
                <div className="flex-1 min-w-0 w-full max-w-none md:max-w-xl mx-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-teal-500 font-bold text-base md:text-lg">
                      Step 2
                    </span>
                    <span className="text-zinc-400 text-base md:text-lg">
                      / 2
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                      style={{
                        width: `${
                          ((storyIdx + 1) / STORY_QUESTIONS.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="mb-4 text-xl md:text-2xl font-bold flex items-center gap-2">
                    <span className="text-2xl md:text-3xl">
                      {STORY_QUESTIONS[storyIdx].emoji}
                    </span>
                    {STORY_QUESTIONS[storyIdx].question}
                  </div>
                  <Input
                    value={form.story[storyIdx]}
                    onChange={(e) => handleStoryChange(e.target.value)}
                    placeholder={STORY_QUESTIONS[storyIdx].placeholder}
                    className="mb-2 text-base md:text-lg"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={handleSkip}
                      disabled={storyIdx === STORY_QUESTIONS.length - 1}
                    >
                      Skip
                    </Button>
                    <Button
                      className="rounded-full bg-amber-400 hover:bg-amber-500 text-white"
                      onClick={handleNextStory}
                    >
                      {storyIdx === STORY_QUESTIONS.length - 1
                        ? "Let's do this!"
                        : "Next"}
                    </Button>
                  </div>
                  <div className="mt-4 text-teal-500 text-sm md:text-base animate-fade-in">
                    {storyIdx === 0 && "Nice! Just one more if you like."}
                    {storyIdx === 1 && "Awesome! Last question 🚀"}
                    {storyIdx === 2 &&
                      "Thank you! Ready to launch your challenge?"}
                  </div>
                </div>
                {/* Sidebar (PC) */}
                <aside className="hidden md:block w-[420px] bg-zinc-50 border-l border-zinc-100 rounded-xl p-8 text-sm text-zinc-600 shadow-sm animate-fade-in self-stretch">
                  <div className="font-bold mb-2 text-zinc-800 text-lg">
                    Why story matters
                  </div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Challenges with a story get 2x more support!</li>
                    <li>Honest stories inspire more encouragement</li>
                    <li>Even failures are celebrated here!</li>
                  </ul>
                  <div className="mt-4 text-xs text-zinc-400">
                    Be yourself and share as much as you want.
                  </div>
                </aside>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
