import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useAuth } from "@/context/AuthContext";

interface CommentsProps {
  challengeId: string;
  openLoginModal?: () => void;
}

interface CommentItem {
  id: string;
  comment: string;
  name: string;
  user_id: string;
  created_at: string;
}

export function Comments({ challengeId, openLoginModal }: CommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [posting, setPosting] = useState(false);
  const { user } = useAuth();

  // userName 불러오기 (user가 있을 때만)
  useEffect(() => {
    if (user?.id) {
      supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setUserName(data.name);
          } else {
            setUserName(null);
          }
        });
    } else {
      setUserName(null);
    }
  }, [user]);

  // 댓글 불러오기
  useEffect(() => {
    if (!challengeId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("comments")
      .select("id, comment, name, user_id, created_at")
      .eq("challenge_id", challengeId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setComments([]);
        } else {
          setComments(data || []);
          setError(null);
        }
        setLoading(false);
      });
  }, [challengeId]);

  // 댓글 작성
  const handlePost = async () => {
    if (!input.trim() || !user || !userName) return;
    setPosting(true);
    const { error } = await supabase.from("comments").insert({
      comment: input,
      name: userName,
      user_id: user.id,
      challenge_id: challengeId,
    });
    setPosting(false);
    if (error) {
      alert("댓글 등록 실패: " + error.message);
      return;
    }
    setInput("");
    // 새로고침
    setLoading(true);
    supabase
      .from("comments")
      .select("id, comment, name, user_id, created_at")
      .eq("challenge_id", challengeId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setComments(data || []);
        setLoading(false);
      });
  };

  // Post Comment 버튼 클릭 시
  const handleButtonClick = () => {
    if (!user && openLoginModal) {
      openLoginModal();
      return;
    }
    handlePost();
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
      {/* Comment Form */}
      <div className="flex gap-4 mb-8">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>
            {userName?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          {/* 입력칸 */}
          {!user ? (
            <div
              className="relative opacity-60 cursor-not-allowed"
              onClick={() => {
                if (openLoginModal) openLoginModal();
              }}
            >
              <textarea
                className="w-full p-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Share your thoughts or ask a question..."
                rows={3}
                value={input}
                style={{ pointerEvents: "none" }}
                readOnly
              />
            </div>
          ) : (
            <textarea
              className="w-full p-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Share your thoughts or ask a question..."
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={posting}
            />
          )}
          {/* 버튼 */}
          {!user ? (
            <div
              className="relative opacity-60 cursor-not-allowed"
              onClick={() => {
                if (openLoginModal) openLoginModal();
              }}
            >
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white"
                style={{ pointerEvents: "none" }}
                disabled
              >
                Post Comment
              </Button>
            </div>
          ) : (
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white"
              onClick={handleButtonClick}
              disabled={posting}
            >
              {posting ? "Posting..." : "Post Comment"}
            </Button>
          )}
        </div>
      </div>
      {/* 댓글 목록 */}
      {loading ? (
        <div className="text-zinc-400">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : comments.length === 0 ? (
        <div className="text-zinc-400">Be the first to leave a comment!</div>
      ) : (
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {c.name?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{c.name || "Unknown"}</span>
                  <span className="text-xs text-zinc-500">
                    {c.created_at
                      ? new Date(c.created_at).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <p className="text-zinc-700 mb-2">{c.comment}</p>
                {/* 좋아요/답글 등은 추후 구현 */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
