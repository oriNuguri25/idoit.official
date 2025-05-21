import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ThirdBlock = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-3">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
            Failure Archive
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Learn From Beautiful Failures
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Our archive of failures is a treasure trove of learning. Discover
            what didn't work and why.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
          <div className="relative col-span-2 row-span-2 group overflow-hidden rounded-2xl">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Failure example"
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <Badge className="self-start mb-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                Marathon Training
              </Badge>
              <h3 className="text-xl font-bold text-white mb-1">
                How I Failed My First Marathon
              </h3>
              <p className="text-white/80 text-sm mb-2">
                What I learned about pacing, nutrition, and listening to my
                body.
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-white/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>RN</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white/80">
                  @runner_in_progress
                </span>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/placeholder.svg?height=200&width=300"
              alt="Failure example"
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
              <Badge className="self-start mb-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                Pottery
              </Badge>
              <h3 className="text-sm font-bold text-white">
                My App That Nobody Downloaded
              </h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/placeholder.svg?height=200width=300"
              alt="Failure example"
              className="object-cover transition-transform w-full h-full group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
              <Badge className="self-start mb-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                Cooking
              </Badge>
              <h3 className="text-sm font-bold text-white">
                My Sourdough Bread Disaster
              </h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl">
            <img
              src="/placeholder.svg?height=200width=300"
              alt="Failure example"
              className="object-cover transition-transform w-full h-full group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
              <Badge className="self-start mb-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                Content
              </Badge>
              <h3 className="text-sm font-bold text-white">
                My YouTube Channel That Flopped
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="group">
            Explore the failure archive
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThirdBlock;
