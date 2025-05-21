import { ExperimentCard } from "@/components/ExperimentCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SecondBlock = () => {
  return (
    <section className="py-16 md:py-24 bg-zinc-100">
      <div className="max-w-[1400px] mx-auto px-3">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <Badge className="mb-2 bg-teal-100 text-teal-800 hover:bg-teal-200">
              Featured Experiments
            </Badge>
            <h2 className="text-3xl font-bold">Discover Bold Attempts</h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View all experiments
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExperimentCard
            title="Building a Cardboard Boat That Actually Floats"
            creator="marina_makes"
            description="Attempting to build a cardboard boat that can carry me across the lake. Spoiler: I got very wet."
            donationAmount={1250}
            donationGoal={2000}
            image="/placeholder.svg?height=200&width=400"
            category="Engineering"
            color="from-teal-500 to-emerald-500"
          />

          <ExperimentCard
            title="Learning to Draw Portraits in 30 Days"
            creator="sketch_novice"
            description="My journey to learn portrait drawing in just a month. The results are... interesting."
            donationAmount={850}
            donationGoal={1500}
            image="/placeholder.svg?height=200&width=400"
            category="Art"
            color="from-fuchsia-500 to-pink-500"
          />

          <ExperimentCard
            title="Coding My First Game Without Tutorials"
            creator="dev_explorer"
            description="Trying to build a simple platformer game without following any tutorials. It's buggy but it's mine!"
            donationAmount={620}
            donationGoal={1000}
            image="/placeholder.svg?height=200&width=400"
            category="Coding"
            color="from-blue-500 to-indigo-500"
          />

          <ExperimentCard
            title="Baking Sourdough From Scratch"
            creator="bread_enthusiast"
            description="My attempt to create a sourdough starter and bake bread that doesn't resemble a brick."
            donationAmount={1800}
            donationGoal={2000}
            image="/placeholder.svg?height=200&width=400"
            category="Cooking"
            color="from-amber-500 to-orange-500"
          />

          <ExperimentCard
            title="30 Days of Yoga for Non-Flexible People"
            creator="cant_touch_toes"
            description="As someone who can barely bend over, I'm documenting my journey to touch my toes and beyond."
            donationAmount={1250}
            donationGoal={2500}
            image="/placeholder.svg?height=200&width=400"
            category="Fitness"
            color="from-violet-500 to-purple-500"
          />

          <ExperimentCard
            title="Learning Spanish in 60 Days"
            creator="language_lover"
            description="My overly ambitious attempt to become conversational in Spanish in just two months."
            donationAmount={750}
            donationGoal={2000}
            image="/placeholder.svg?height=200&width=400"
            category="Languages"
            color="from-red-500 to-rose-500"
          />
        </div>
      </div>
    </section>
  );
};

export default SecondBlock;
