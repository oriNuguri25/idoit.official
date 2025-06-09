import React, { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ExperimentCard } from "@/components/ExperimentCard";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Challenges = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [amountMap, setAmountMap] = useState<Record<string, number>>({});
  const [commentMap, setCommentMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      // 1. 모든 챌린지 불러오기 (작성자 이름 포함)
      const { data, error } = await supabase
        .from("challenges")
        .select("*, public_profiles(user_name)")
        .order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setChallenges(data || []);
      // 2. 후원금 합계
      const ids = (data || []).map((c: any) => c.id);
      if (ids.length === 0) {
        setAmountMap({});
        setCommentMap({});
        setLoading(false);
        return;
      }
      const { data: donateData } = await supabase
        .from("donate")
        .select("challenge_id, amount");
      const amountMap: Record<string, number> = {};
      (donateData || []).forEach((row: any) => {
        if (!row.challenge_id || typeof row.amount !== "number") return;
        amountMap[row.challenge_id] =
          (amountMap[row.challenge_id] || 0) + row.amount;
      });
      setAmountMap(amountMap);
      // 3. 댓글 수
      const { data: commentData } = await supabase
        .from("comments")
        .select("challenge_id, id");
      const commentMap: Record<string, number> = {};
      (commentData || []).forEach((row: any) => {
        if (!row.challenge_id) return;
        commentMap[row.challenge_id] = (commentMap[row.challenge_id] || 0) + 1;
      });
      setCommentMap(commentMap);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
          <div className="mb-10">
            <Badge className="mb-2 bg-teal-100 text-teal-800 hover:bg-teal-200">
              All Challenges
            </Badge>
            <h1 className="text-4xl font-extrabold mb-2 leading-tight tracking-tight">
              Explore All Challenges
            </h1>
            <p className="text-zinc-500 text-lg">
              Discover, support, and get inspired by the community's boldest
              experiments.
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12 text-zinc-400">Loading...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : challenges.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              No challenges found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((c) => (
                <ExperimentCard
                  id={c.id}
                  key={c.id}
                  title={c.title}
                  creator={c.public_profiles?.user_name || "Unknown"}
                  description={c.description}
                  image={
                    Array.isArray(c.cover_image)
                      ? c.cover_image
                      : typeof c.cover_image === "string"
                      ? JSON.parse(c.cover_image)
                      : []
                  }
                  category={c.category}
                  color={c.color || "from-teal-500 to-emerald-500"}
                  likes={c.likes || 0}
                  comments={commentMap[c.id] || 0}
                  likedByMe={c.likedByMe || false}
                  amount={amountMap[c.id] || 0}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Challenges;
