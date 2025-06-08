import Header from "@/components/Layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useEffect, useState } from "react";
import { Comments } from "@/pages/ChallengeDetail/Comments";
import LoginModal from "@/components/LoginModal";
import Donate from "@/pages/ChallengeDetail/Donate";

export default function ChallengeMain() {
  const params = useParams();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("challenges")
        .select("*, public_profiles(user_name)")
        .eq("id", params.id)
        .single();
      if (error) {
        setError(error.message);
      } else {
        setChallenge(data);
      }
      setLoading(false);
    };
    fetchChallenge();
  }, [params.id]);

  if (loading)
    return <div className="text-center py-12 text-zinc-400">Loading...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!challenge)
    return (
      <div className="text-center py-12 text-zinc-400">Challenge not found</div>
    );

  // cover_image, story 등은 string -> 배열로 변환
  let coverImages: string[] = [];
  try {
    coverImages = challenge.cover_image
      ? Array.isArray(challenge.cover_image)
        ? challenge.cover_image
        : JSON.parse(challenge.cover_image)
      : [];
  } catch {
    coverImages = [];
  }

  let story: any[] = [];
  try {
    story = challenge.story
      ? Array.isArray(challenge.story)
        ? challenge.story
        : JSON.parse(challenge.story)
      : [];
  } catch {
    story = [];
  }

  // creator 이름 처리 (public_profiles 조인 결과)
  const creator = challenge.public_profiles?.user_name || "Unknown";

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
          <div>
            <h1 className="text-5xl font-extrabold mb-2 leading-tight tracking-tight">
              {challenge.title}
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* 대표 이미지 - 세로폭 더 크게 */}
              <div className="relative h-[520px] w-full mb-6 rounded-2xl overflow-hidden">
                <img
                  src={coverImages[0] || "/placeholder.svg"}
                  alt={challenge.title}
                  className="object-cover w-full h-full priority"
                />
              </div>
              {/* 카테고리/상태/기간 등은 한 줄에 */}
              <div className="flex flex-wrap items-center gap-4 text-zinc-600 mb-4 text-base">
                <Badge
                  variant="outline"
                  className="bg-zinc-100 text-zinc-700 border-zinc-200 px-3 py-1 text-base font-bold"
                >
                  {challenge.category}
                </Badge>
                {/* 상태 pill: do=teal, fail=rose, completed=emerald */}
                <Badge
                  className={
                    (challenge.state === "fail"
                      ? "bg-rose-100 text-rose-700 border-rose-200"
                      : challenge.state === "completed"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-teal-100 text-teal-700 border-teal-200") +
                    " px-3 py-1 text-base font-bold"
                  }
                >
                  {challenge.state
                    ? challenge.state.charAt(0).toUpperCase() +
                      challenge.state.slice(1)
                    : "Do"}
                </Badge>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-5 w-5" />
                  {challenge.created_at
                    ? new Date(challenge.created_at).toLocaleDateString()
                    : "-"}
                </span>
                {/* 기간도 색상 pill로 */}
                <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 px-3 py-1 text-base font-bold">
                  {challenge.duration || "-"}
                </Badge>
              </div>
              {/* 창작자 이름 - 제목 바로 아래, 강조 */}
              <div className="pl-2 mb-4">
                <span className="text-lg text-zinc-700 font-semibold">
                  {creator}
                </span>
              </div>
              {/* 탭 컨텐츠 */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                </TabsList>
                {/* About: Description + story 1,2,3 */}
                <TabsContent value="about" className="space-y-8">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-2">Description</h2>
                    <p className="text-lg text-zinc-700 leading-relaxed mb-8">
                      {challenge.description}
                    </p>
                  </div>
                  {Array.isArray(story) &&
                    story.slice(0, 3).map((item: any, idx: number) => {
                      // item이 string이면(예: ["", "내용", ""]), 값이 없으면 건너뜀
                      if (typeof item === "string") {
                        if (!item.trim()) return null;
                        return (
                          <div key={idx} className="space-y-2">
                            <h3 className="text-xl font-bold mt-2 mb-1">
                              Story {idx + 1}
                            </h3>
                            <p className="text-zinc-700 whitespace-pre-line">
                              {item}
                            </p>
                          </div>
                        );
                      }
                      // 객체라면 기존대로(이미지+타이틀+내용)
                      if (
                        !item ||
                        (!item.content && !item.title && !item.image)
                      )
                        return null;
                      return (
                        <div key={idx} className="space-y-2">
                          {item.image && (
                            <div className="aspect-[3/2] w-full bg-zinc-100 mb-2">
                              <img
                                src={item.image}
                                alt={item.title || `story-${idx}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <h3 className="text-xl font-bold mt-2 mb-1">
                            Story {idx + 1}
                            {item.title ? `: ${item.title}` : ""}
                          </h3>
                          <p className="text-zinc-700 whitespace-pre-line">
                            {item.content || item.title}
                          </p>
                        </div>
                      );
                    })}
                </TabsContent>
                <TabsContent value="materials" className="space-y-4">
                  <h3 className="text-xl font-bold">Materials</h3>
                  <div className="text-zinc-700">준비물 정보가 없습니다.</div>
                </TabsContent>
              </Tabs>

              {/* 댓글 섹션 */}
              <Comments
                challengeId={challenge.id}
                openLoginModal={() => setLoginModalOpen(true)}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Donate
                challengeId={challenge.id}
                openLoginModal={() => setLoginModalOpen(true)}
              />
            </div>
          </div>
        </section>
      </main>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}
