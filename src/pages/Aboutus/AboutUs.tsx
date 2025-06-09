import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Heart, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: (
      <Zap className="h-10 w-10 text-amber-400 group-hover:animate-bounce" />
    ), // Progress
    title: "Progress Over Perfection",
    desc: "We celebrate trying, not just succeeding. Sharing your journey, missteps and all, is more inspiring than pretending to be flawless.",
  },
  {
    icon: (
      <Lightbulb className="h-10 w-10 text-teal-400 group-hover:animate-pulse" />
    ), // Honesty
    title: "Honesty and Transparency",
    desc: "We encourage open stories about what worked, what didn't, and what you learned. Failure isn't shameful here. It's part of the fun.",
  },
  {
    icon: (
      <Users className="h-10 w-10 text-indigo-400 group-hover:animate-wiggle" />
    ), // Community
    title: "Community First Spirit",
    desc: "Every comment, every cheer, and every small donation helps someone take their next step. This is a space where we lift each other up.",
  },
  {
    icon: (
      <Heart className="h-10 w-10 text-pink-400 group-hover:animate-pulse" />
    ), // Playfulness
    title: "Playfulness with Purpose",
    desc: "We embrace silly and light-hearted projects. Behind every playful attempt is someone stretching their creativity and courage. That matters.",
  },
];

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main className="flex-1">
        {/* Section 1: About Idoit */}
        <section className="w-full py-20 px-4 md:px-0 bg-gradient-to-br from-orange-50 via-white to-teal-50">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Left: Text */}
            <div className="flex-1 min-w-0">
              <Badge className="mb-3 bg-violet-100 text-violet-800 hover:bg-violet-200">
                About Idoit
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-zinc-800">
                Why We Exist
              </h1>
              <p className="text-zinc-700 text-lg mb-4">
                Idoit is a home for the makers, dreamers, and wonderfully quirky
                people who dare to try something new. Here, you don't have to be
                perfect or polished. You just have to be curious and willing to
                start.
              </p>
              <p className="text-zinc-600 text-base mb-6">
                We know that some of the most meaningful projects begin as
                small, odd, or even silly ideas. That's why we built Idoit: a
                warm, open space where you can share your progress, your
                failures, and your wildest experiments. Here, you'll find
                encouragement, support, and a community that celebrates every
                honest attempt, no matter the outcome.
              </p>
              <div className="flex flex-col items-center md:items-start">
                <Link to="/create">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-3 rounded-lg shadow-md cursor-pointer">
                    Start Your First Challenge
                  </Button>
                </Link>
              </div>
            </div>
            {/* Right: Illustration */}
            <div className="flex-1 flex justify-center items-center min-w-[320px]">
              {/* Playful/abstract illustration (SVG or placeholder) */}
              <div className="w-[320px] h-[320px] rounded-3xl bg-gradient-to-br from-teal-100 via-orange-100 to-violet-100 flex items-center justify-center shadow-lg border-2 border-dashed border-teal-200">
                {/* 예시: 아이디어 전구, 하트, 유저, 번개 등 조합 */}
                <div className="flex flex-col items-center gap-4">
                  <Lightbulb className="h-16 w-16 text-teal-400 animate-bounce" />
                  <Heart className="h-12 w-12 text-pink-400 animate-pulse" />
                  <Users className="h-12 w-12 text-indigo-400 animate-wiggle" />
                  <Zap className="h-12 w-12 text-amber-400 animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2: Our Values */}
        <section className="w-full py-20 px-4 md:px-0 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-zinc-800">
              What We Believe In
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group bg-gradient-to-br from-white to-zinc-50 rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer border border-zinc-100"
                >
                  <div className="mb-4">{v.icon}</div>
                  <h3 className="text-xl font-bold text-zinc-800 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-zinc-600 text-base">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Section 3: Vision/For Whom */}
        <section className="w-full py-16 px-4 md:px-0 bg-gradient-to-br from-teal-50 via-white to-orange-50">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-zinc-800">
              Our Vision
            </h2>
            <p className="text-zinc-700 text-lg mb-4">
              Our vision is to create a community where small, honest, and
              experimental challenges are truly celebrated. We believe that not
              everything needs to be serious or successful. What matters most is
              the courage to try, the willingness to share, and the joy of
              learning together. Every step you take with heart is something to
              be proud of, and we'll be here to cheer you on.
            </p>
            <h3 className="text-xl font-bold text-teal-700 mt-10 mb-2">
              For Whom?
            </h3>
            <p className="text-zinc-600 text-base mb-2">
              Quirky inventors, first-time makers, curious minds, and anyone who
              ever thought, <br />
              <span className="italic text-zinc-700">
                "I'd love to try this… but will anyone care?"
              </span>
            </p>
            <p className="text-zinc-700 text-base">
              Yes, we care. We'll cheer for your bold attempts, your missteps,
              your breakthroughs, and everything in between.
              <br />
              Because doing something because you do it matters.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
