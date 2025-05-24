import { ProgressCircle } from "@/components/ProgressCircle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Lightbulb, PlusCircle, Zap } from "lucide-react";
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
            <span className="text-sm font-medium">Process Over Perfection</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Start something you might{" "}
            <span className="relative">
              <span className="relative z-10 text-teal-300">fail</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-teal-500/30"></span>
            </span>{" "}
            at.
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-lg">
            A creative platform where the journey matters more than the
            destination, and learning through failure is celebrated.
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
              className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white"
            >
              Explore Experiments
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[400px]">
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <Badge className="bg-white/20 text=white hover:bg-white/30">
                  Most Popular
                </Badge>
                <span className="flex items-center gap-1 text-sm">
                  <Heart className="h-4 w-4" /> 128
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">
                  Building a Tiny House
                </h3>
                <p className="text-sm text-white/80">
                  With zero construction experience
                </p>
              </div>
            </div>
            <div className="row-span-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 flex flex-col justify-between">
              <ProgressCircle progress={65} size={60} strokeWidth={6} />
              <div>
                <h3 className="text-sm font-bold">Learning Piano</h3>
                <p className="text-xs text-white/80">Day 65 of 100</p>
              </div>
            </div>
            <div className="col-span-1 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl p-4 flex items-center justify-center">
              <Zap className="h-8 w-8" />
            </div>
            <div className="col-span-2 bg-gradient-to-br from-blue-500 to-indigo--500 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Latest Insight</h3>
                <p className="text-xs text-white/80">
                  Failure builds resilience
                </p>
              </div>
              <Lightbulb className="h-6 w-6" />
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
