import Header from "@/components/Layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ChevronLeft,
  Clock,
  Heart,
  Lightbulb,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ChallengeMain() {
  const challenge = {
    id: "building-cardboard-boat",
    title: "Building a Cardboard Boat That Actually Floats",
    creator: "marina_makes",
    creatorAvatar: "/placeholder.svg",
    description:
      "Attempting to build a cardboard boat that can carry me across the lake. Spoiler: I got very wet.",
    fullDescription:
      "I've always been fascinated by cardboard boat races, where participants build boats entirely out of cardboard and attempt to race them across water before they inevitably sink. With zero construction experience and armed only with cardboard boxes, duct tape, and waterproof sealant, I'm attempting to build a boat that can carry me across the local lake. This experiment is about learning the basics of buoyancy, waterproofing techniques, and structural design - all through the process of likely failing spectacularly.",
    donationAmount: 1250,
    donationGoal: 2000,
    supporters: 42,
    comments: 18,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Engineering",
    status: "ongoing",
    startDate: "2023-04-15",
    estimatedCompletion: "2023-05-30",
    recentSupporters: [
      {
        name: "John Doe",
        avatar: "/placeholder.svg",
        amount: 50,
        timeAgo: "2 hours ago",
      },
      {
        name: "Alice Smith",
        avatar: "/placeholder.svg",
        amount: 25,
        timeAgo: "1 day ago",
      },
      {
        name: "Robert Johnson",
        avatar: "/placeholder.svg",
        amount: 100,
        timeAgo: "3 days ago",
      },
    ],
    updates: [
      {
        id: 1,
        title: "Design Phase Complete",
        date: "April 18, 2023",
        content:
          "After researching successful cardboard boat designs, I've settled on a simple flat-bottom design with reinforced sides. I've sketched out the plans and calculated the approximate dimensions needed to support my weight. Next step: gathering all the cardboard I can find!",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 2,
        title: "Construction Begins",
        date: "April 25, 2023",
        content:
          "Today I started cutting and assembling the base of the boat. I'm using a double-layer technique for the bottom to increase strength. The cardboard is surprisingly sturdy when layered correctly, but cutting precise shapes is harder than I expected. My living room is now a sea of cardboard scraps!",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        id: 3,
        title: "Waterproofing Test - Partial Failure",
        date: "May 5, 2023",
        content:
          "I tested my waterproofing technique on a small cardboard sample, and it didn't go well. The sealant I chose didn't fully protect the cardboard - it started absorbing water after about 10 minutes. I need to find a better waterproofing solution or my voyage will be very short!",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    materials: [
      "Large cardboard boxes (preferably with minimal seams)",
      "Duct tape (lots of it)",
      "Waterproof sealant or polyurethane",
      "Box cutter and scissors",
      "Measuring tape",
      "Paintbrush for applying sealant",
    ],
    learnings: [
      "Cardboard has a grain direction that affects its strength",
      "Multiple thin layers are often stronger than one thick layer",
      "Most waterproofing solutions are temporary at best",
      "Weight distribution is critical for stability",
    ],
  };

  const donationPercentage = Math.min(
    Math.round((challenge.donationAmount / challenge.donationGoal) * 100),
    100
  );

  const formattedDonation = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(challenge.donationAmount);

  const formattedGoal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(challenge.donationGoal);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main className="flex-1">
        {/* 뒤로가기 */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-zinc-600 hover:text-teal-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Experiments
          </Link>
        </div>

        {/* 메인 컨텐츠 */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
                <img
                  src={challenge.image || "/placeholder.svg"}
                  alt={challenge.title}
                  className="object-cover w-full h-full priority"
                />
              </div>

              <div className="flex flex-wrap gap-4 mb-8 text-zinc-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Started: {challenge.startDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    Est. completion: {challenge.estimatedCompletion}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {challenge.status.charAt(0).toUpperCase() +
                      challenge.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* 탭 컨텐츠 */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="learnings">Learnings</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-lg text-zinc-700 leading-relaxed">
                      {challenge.fullDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-zinc-100">
                      Cardboard
                    </Badge>
                    <Badge variant="outline" className="bg-zinc-100">
                      DIY
                    </Badge>
                    <Badge variant="outline" className="bg-zinc-100">
                      Engineering
                    </Badge>
                    <Badge variant="outline" className="bg-zinc-100">
                      Water
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="updates" className="space-y-8">
                  {challenge.updates.map((update) => (
                    <Card key={update.id} className="overflow-hidden">
                      <div className="relative h-[200px] w-full">
                        <img
                          src={update.image || "/placeholder.svg"}
                          alt={update.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold">{update.title}</h3>
                          <span className="text-sm text-zinc-500">
                            {update.date}
                          </span>
                        </div>
                        <p className="text-zinc-700">{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="materials" className="space-y-4">
                  <h3 className="text-xl font-bold">Materials Used</h3>
                  <ul className="space-y-2">
                    {challenge.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-zinc-700">{material}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="learnings" className="space-y-4">
                  <h3 className="text-xl font-bold">Key Learnings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {challenge.learnings.map((learning, index) => (
                      <Card key={index} className="bg-zinc-50 border-zinc-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="h-4 w-4" />
                            </div>
                            <p className="text-zinc-700">{learning}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* 댓글 섹션 */}
              <div className="mt-12 border-t pt-8">
                <h3 className="text-xl font-bold mb-6">
                  Comments ({challenge.comments})
                </h3>

                {/* Comment Form */}
                <div className="flex gap-4 mb-8">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <textarea
                      className="w-full p-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Share your thoughts or ask a question..."
                      rows={3}
                    ></textarea>
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                      Post Comment
                    </Button>
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>TS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Tom Smith</span>
                        <span className="text-xs text-zinc-500">
                          3 days ago
                        </span>
                      </div>
                      <p className="text-zinc-700 mb-2">
                        Have you considered using spray-on truck bed liner for
                        waterproofing? I used it on a similar project and it
                        worked great!
                      </p>
                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <button className="flex items-center gap-1 hover:text-teal-600">
                          <Heart className="h-4 w-4" /> 12
                        </button>
                        <button className="flex items-center gap-1 hover:text-teal-600">
                          <MessageSquare className="h-4 w-4" /> Reply
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Jessica Lee</span>
                        <span className="text-xs text-zinc-500">
                          5 days ago
                        </span>
                      </div>
                      <p className="text-zinc-700 mb-2">
                        I'm so excited to see how this turns out! I've been
                        wanting to try something similar but was too afraid of
                        the inevitable sinking. Your updates are giving me
                        courage!
                      </p>
                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <button className="flex items-center gap-1 hover:text-teal-600">
                          <Heart className="h-4 w-4" /> 8
                        </button>
                        <button className="flex items-center gap-1 hover:text-teal-600">
                          <MessageSquare className="h-4 w-4" /> Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Combined Donation Card with Recent Supporters */}
              <Card className="overflow-hidden sticky top-4">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-bold text-zinc-900">
                      {formattedDonation}
                    </h3>
                    <span className="text-zinc-500 text-sm">raised</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        style={{ width: `${donationPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {donationPercentage}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-6 text-sm text-zinc-600">
                    <span>{formattedGoal} goal</span>
                    <span>{challenge.supporters} supporters</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                      Support with $10
                    </Button>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      Support with $25
                    </Button>
                    <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white">
                      Support with $50
                    </Button>
                    <Button variant="outline" className="w-full">
                      Custom Amount
                    </Button>
                  </div>

                  <div className="mb-4 pt-6 border-t border-zinc-100">
                    <Button variant="outline" className="w-full justify-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Recent Supporters Section */}
                  <div className="pt-6 border-t border-zinc-100">
                    <h3 className="font-medium mb-4">Recent Supporters</h3>
                    <div className="space-y-4">
                      {challenge.recentSupporters.map((supporter, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={supporter.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {supporter.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {supporter.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-zinc-600">
                                ${supporter.amount}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {supporter.timeAgo}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 text-teal-600 hover:text-teal-700"
                    >
                      See all supporters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
