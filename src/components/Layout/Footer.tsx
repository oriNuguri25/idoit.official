import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Facebook, Instagram, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-white w-full">
      <div className="max-w-[1400px] mx-auto px-3 flex flex-col gap-8 py-8 md:py-12">
        {/* 상단: 로고/설명/소셜 + 네비게이션 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* 로고/설명/소셜 */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-4">
            <Link to="/" className="flex items-center mb-2">
              <div className="font-bold text-xl bg-gradient-to-r from-teal-500 to-violet-600 bg-clip-text text-transparent">
                Idoit
              </div>
            </Link>
            <p className="text-zinc-500 max-w-md text-sm md:text-base">
              A creative platform where users can launch small experimental
              projects, document their process, share honest failures, and
              receive support or constructive feedback from others.
            </p>
            <div className="flex space-x-3 mt-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="w-5 h-5" />
                <span className="sr-only">X</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          {/* 네비게이션 */}
          <nav className="flex-1 min-w-[180px] md:pl-8">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/challenges"
                  className="text-zinc-500 hover:text-teal-500 font-medium transition-colors"
                >
                  Challenges
                </Link>
              </li>
              <li>
                <Link
                  to="/archive"
                  className="text-zinc-500 hover:text-teal-500 font-medium transition-colors"
                >
                  Failure Archive
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-zinc-500 hover:text-teal-500 font-medium transition-colors"
                >
                  About us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* 하단: 저작권/정책 */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-sm text-zinc-500">
          <p>2025 Idoit. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-teal-500 transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="hover:text-teal-500 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
