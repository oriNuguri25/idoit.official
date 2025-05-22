import { Card, CardContent } from "./ui/card";
import GoogleIcon from "./Icon/GoogleIcon";
import { AppleIcon } from "lucide-react";
import { SocialLogin } from "@/lib/supabase/SocialLogin";
import React from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-xs md:max-w-md relative rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-2xl font-bold px-2 z-10"
          onClick={onClose}
          aria-label="닫기"
        >
          &times;
        </button>
        <CardContent className="flex flex-col items-center gap-6 pt-10 pb-8 px-6">
          {/* 로고 */}
          <div className="flex flex-col items-center mb-2">
            <span className="text-2xl font-bold text-green-600 tracking-tight">
              idoit
            </span>
          </div>
          {/* Welcome */}
          <div className="w-full flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-zinc-900">Welcome</span>
            <span className="text-sm text-zinc-500 text-center">
              Sign in to Idoit or sign up to continue.
            </span>
          </div>
          {/* 소셜 로그인 버튼 */}
          <div className="w-full flex flex-col gap-3 mt-2">
            <button
              className="w-full flex items-center gap-3 border border-zinc-300 rounded-xl bg-white hover:bg-zinc-50 transition-colors py-3 px-4 text-base font-semibold text-zinc-800 shadow-sm"
              onClick={() => SocialLogin("google")}
            >
              <div className="flex items-center justify-center">
                <GoogleIcon />
              </div>
              <span className="flex-1 font-medium text-center">
                Continue with Google
              </span>
            </button>
            <button className="w-full flex items-center gap-3 border border-zinc-300 rounded-xl bg-white hover:bg-zinc-50 transition-colors py-3 px-4 text-base font-semibold text-zinc-800 shadow-sm">
              <AppleIcon className="w-6 h-6" />
              <span className="flex-1 font-medium text-center">
                Continue with Apple
              </span>
            </button>
          </div>
          {/* or 구분선 */}
          <div className="flex items-center gap-2 w-full my-1">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>
          {/* 이메일 입력 */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border-2 border-green-300 focus:border-green-500 rounded-xl px-4 py-3 outline-none text-base placeholder:text-zinc-400 transition-colors"
          />
          {/* Continue 버튼 */}
          <button className="w-full mt-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl text-base transition-colors">
            Continue
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginModal;
