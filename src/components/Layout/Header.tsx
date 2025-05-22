import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/SupabaseClient";
import LoginModal from "@/components/LoginModal";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setLoginOpen(false);
  };

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
          {/* 로그인/로그아웃 버튼 */}
          {user ? (
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => setLoginOpen(true)}
            >
              Sign in
            </Button>
          )}

          {/* 도전 시작 버튼 */}
          {user ? (
            <Link to="/create">
              <Button className="hidden md:inline-flex bg-teal-500 hover:bg-teal-600 text-white border-0">
                Start your journey
              </Button>
            </Link>
          ) : (
            <Button
              className="hidden md:inline-flex bg-teal-500 hover:bg-teal-600 text-white border-0"
              onClick={() => setLoginOpen(true)}
            >
              Start your journey
            </Button>
          )}
        </div>
      </div>
      {/* 로그인 모달 */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
};

export default Header;
