import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, AppleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const googleLogin = async () => {};
  return (
    <header className="sticky top-0 z-50 w-full bg-white py-3 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-3 flex h-16 items-center justify-between w-full">
        <div className="flex items-center gap-2 md:gap-8">
          {/* 모바일 메뉴 */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Idoit</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/challenges"
                  className="text-lg font-medium text-zinc-900 hover:text-teal-500"
                >
                  Challenges
                </Link>
                <Link
                  to="/archive"
                  className="text-lg font-medium text-zinc-900 hover:text-teal-500"
                >
                  Failure Archive
                </Link>
                <Link
                  to="/aboutus"
                  className="text-lg font-medium text-zinc-900 hover:text-teal-500"
                >
                  About us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* 로고 */}
          <Link to="/" className="flex items-center">
            <div className="font-bold text-xl bg-gradient-to-r from-teal-500 to-violet-600 bg-clip-text text-transparent">
              Idoit
            </div>
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/challenges"
              className="text-zinc-600 hover:text-teal-500 font-medium"
            >
              Challenges
            </Link>
            <Link
              to="/archive"
              className="text-zinc-600 hover:text-teal-500 font-medium"
            >
              Failure Archive
            </Link>
            <Link
              to="/aboutus"
              className="text-zinc-600 hover:text-teal-500 font-medium"
            >
              About us
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* 로그인 버튼 */}
          <Button
            variant="ghost"
            className="hidden md:inline-flex"
            onClick={() => setLoginOpen(true)}
          >
            Sign in
          </Button>

          {/* 도전 시작 버튼 */}
          <Link to="/create">
            <Button className="hidden md:inline-flex bg-teal-500 hover:bg-teal-600 text-white border-0">
              Start your journey
            </Button>
          </Link>
        </div>
      </div>
      {/* 로그인 모달 */}
      {loginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setLoginOpen(false)}
        >
          <Card
            className="w-full max-w-xs md:max-w-md relative rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-2xl font-bold px-2 z-10"
              onClick={() => setLoginOpen(false)}
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
                <span className="text-2xl font-bold text-zinc-900">
                  Welcome
                </span>
                <span className="text-sm text-zinc-500 text-center">
                  Sign in to Idoit or sign up to continue.
                </span>
              </div>
              {/* 소셜 로그인 버튼 */}
              <div className="w-full flex flex-col gap-3 mt-2">
                <button
                  className="w-full flex items-center gap-3 border border-zinc-300 rounded-xl bg-white hover:bg-zinc-50 transition-colors py-3 px-4 text-base font-semibold text-zinc-800 shadow-sm"
                  onClick={googleLogin}
                >
                  <div className="flex items-center justify-center">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-6 h-6"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
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
      )}
    </header>
  );
};

export default Header;
