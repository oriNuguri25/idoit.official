import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Users } from "lucide-react";

const FirstBlock = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-3 relative">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-violet-100 text-violet-800 hover:bg-violet-200">
            How It Works
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Embrace Your Bold, Silly Challenges
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Idoit is a space to share imperfect, playful, and honest attempts
            and get cheered on along the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md border border-zinc-100 relative p-8 hover:shadow-lg transition-shadow">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Post Your Challenge
              </h3>
              <p className="text-zinc-600 text-center mb-6">
                Share that fun, weird, or bold thing you've always wanted to
                try. No need to promise success the process is what matters.
              </p>
              <div className="mt-auto pt-4 border-t border-zinc-100">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
                    Write a short intro about your challenge
                  </li>
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
                    Set your own pace days, weeks, or months
                  </li>
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-2" />
                    Be open to the unexpected!
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md border border-zinc-100 relative p-8 hover:shadow-lg transition-shadow">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Share Your Progress
              </h3>
              <p className="text-zinc-600 text-center mb-6">
                Post updates as you go. Success, setbacks, silly moments
                everything is welcome. Let the community cheer you on.
              </p>
              <div className="mt-auto pt-4 border-t border-zinc-100">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                    Post photos, videos, or short updates
                  </li>
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                    Celebrate small wins
                  </li>
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                    Share what makes your challenge unique
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md border border-zinc-100 relative p-8 hover:shadow-lg transition-shadow">
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-fuchsia-500 text-white flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-fuchsia-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-fuchsia-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Celebrate & Reflect
              </h3>
              <p className="text-zinc-600 text-center mb-6">
                Whether you finish or flop, share what you learned. Inspire
                others to start their own weird experiments.
              </p>
              <div className="mt-auto pt-4 border-t border-zinc-100">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mr-2" />
                    Post your final update (success or failure!)
                  </li>
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mr-2" />
                    Reflect on the experience
                  </li>
                  <li className="flex items-center text-sm text-zinc-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mr-2" />
                    Connect with other bold creators
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstBlock;
