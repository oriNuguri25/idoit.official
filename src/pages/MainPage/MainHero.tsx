import { Button } from "@/components/ui/button";
import { Heart, Lightbulb, PlusCircle, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const MainHero = () => (
  <section className="relative bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white">
    {/* 배경 이미지 (absolute) */}
    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10 bg-cover bg-center mix-blend-overlay" />
    {/* 실제 hero 컨텐츠 (header와 동일한 중앙정렬) */}
    <div className="max-w-[1400px] mx-auto px-3 py-16 md:py-24 lg:py-32 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium">I do it. (Idoit)</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Start your{" "}
            <span className="relative">
              <span className="relative z-10 text-teal-300">
                weird, small, bold
              </span>
            </span>{" "}
            project. Share your story.
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-lg">
            Whether it's a quirky invention, an imperfect first try, or a silly
            personal experiment this is a space to document your process,
            embrace the stumbles, and get real support from a community that
            values doing over perfecting.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/create">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white border-0 cursor-pointer"
              >
                Start your journey
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white cursor-pointer"
            >
              Explore Experiments
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[400px]">
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-4">
                    <Heart className="h-12 w-12 animate-pulse mb-3" />
                    <h3 className="text-2xl font-bold mb-2">
                      Start Small,
                      <br />
                      Dream Big
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Every bold attempt begins with curiosity.
                      <br />
                      Your wildest ideas deserve to see the light.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
              <Lightbulb className="h-10 w-10 animate-bounce" />
              <div className="text-sm font-bold mt-3 mb-2">
                Every Attempt Matters
              </div>
              <div className="text-xs text-white/80">
                You're inspiring someone
              </div>
            </div>
            <div className="col-span-1 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-4 flex flex-col items-center justify-center">
              <Users className="h-8 w-8 mb-2" />
              <div className="text-xs font-bold text-center">
                Bold & Silly Welcome
              </div>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Share Your Journey</h3>
                <p className="text-xs text-white/80">
                  Messy and imperfect is beautiful
                </p>
              </div>
              <Zap className="h-6 w-6 animate-spin-slow" />
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <PlusCircle className="h-6 w-6 text-indigo-900" />
          </div>
        </div>
      </div>
    </div>
    <div className="h-16 bg-gradient-to-b from-transparent to-zinc-50" />
  </section>
);

export default MainHero;
