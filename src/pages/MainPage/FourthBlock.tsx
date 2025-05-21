import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const FourthBlock = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900 text-white">
      <div className="max-w-[1400px] mx-auto px-3">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
            Community Voices
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            What Our Experimenters Say
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hear from people who've embraced the process and learned from their
            failures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Jamie Doe</p>
                <p className="text-sm text-white/60">@tiny_house_builder</p>
              </div>
            </div>
            <p className="italic text-white/80 mb-4">
              "Documenting my tiny house build on Idoit changed everything. The
              support when I messed up the framing was incredible, and the
              suggestions helped me fix it."
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Tiny House
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Construction
              </Badge>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Alex Smith</p>
                <p className="text-sm text-white/60">@sketch_novice</p>
              </div>
            </div>
            <p className="italic text-white/80 mb-4">
              "I was terrified to share my early drawings, but the community
              here celebrates the process. Now I look back at my day 1 sketches
              with pride at how far I've come."
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Art
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Drawing
              </Badge>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Morgan Jones</p>
                <p className="text-sm text-white/60">@app_developer</p>
              </div>
            </div>
            <p className="italic text-white/80 mb-4">
              "After my app failed to get any downloads, I was devastated.
              Sharing that experience here helped me understand what went wrong
              and how to approach my next project."
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Coding
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                App Development
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthBlock;
