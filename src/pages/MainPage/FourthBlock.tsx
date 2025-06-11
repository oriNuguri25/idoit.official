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
            Hear from people who dared to try, embraced the mess, and inspired
            others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>LB</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Liam Brooks</p>
              </div>
            </div>
            <p className="italic text-white/80 mb-4">
              "Tried building a robot in under an hour, and it was quite
              chaotic! But I shared every step, and the community feedback made
              it one of my favorite learning experiences."
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Robotics
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                DIY
              </Badge>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Ella Martinez</p>
              </div>
            </div>
            <p className="italic text-white/80 mb-4">
              "Started a mini rooftop garden with zero experience. Lost half my
              plants, but shared the whole journey, and now others are trying
              too!"
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Gardening
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Urban Farming
              </Badge>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>TN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Tom Nguyen</p>
              </div>
            </div>
            <p className="italic text-white/80 mb-4">
              "Posted my first experimental sound track, and it didn't go as
              planned! But sharing the experience helped me connect with other
              audio enthusiasts in the community."
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Music
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30">
                Sound Experiment
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthBlock;
