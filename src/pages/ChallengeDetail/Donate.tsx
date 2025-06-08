import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useAuth } from "@/context/AuthContext";

interface Supporter {
  user_id: string;
  amount: number;
  created_at?: string;
  public_profiles?: { user_name?: string } | null;
}

interface DonateProps {
  challengeId: string;
  openLoginModal?: () => void;
}

export default function Donate({ challengeId, openLoginModal }: DonateProps) {
  const [amount, setAmount] = useState<number | null>(null);
  const [amountLoading, setAmountLoading] = useState(true);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [supportersLoading, setSupportersLoading] = useState(true);
  const [supportersError, setSupportersError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!challengeId) return;
    setAmountLoading(true);
    supabase
      .from("donate")
      .select("amount")
      .eq("challenge_id", challengeId)
      .then(({ data, error }) => {
        if (error) {
          setAmountError(error.message);
          setAmount(null);
        } else {
          const sum = (data || []).reduce(
            (acc, row) => acc + (row.amount || 0),
            0
          );
          setAmount(sum);
          setAmountError(null);
        }
        setAmountLoading(false);
      });
  }, [challengeId]);

  useEffect(() => {
    if (!challengeId) return;
    setSupportersLoading(true);
    supabase
      .from("donate")
      .select("user_id, amount, created_at, public_profiles(user_name)")
      .eq("challenge_id", challengeId)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (error) {
          setSupportersError(error.message);
          setSupporters([]);
        } else {
          const seen = new Set();
          const unique: Supporter[] = [];
          for (const row of data || []) {
            if (!row.user_id || seen.has(row.user_id)) continue;
            seen.add(row.user_id);
            unique.push({
              user_id: row.user_id,
              amount: row.amount,
              created_at: row.created_at,
              public_profiles: Array.isArray(row.public_profiles)
                ? row.public_profiles[0]
                : row.public_profiles ?? null,
            });
            if (unique.length >= 5) break;
          }
          setSupporters(unique);
          setSupportersError(null);
        }
        setSupportersLoading(false);
      });
  }, [challengeId]);

  const handleSupport = async (amount: number) => {
    if (!user && openLoginModal) {
      openLoginModal();
      return;
    }
    if (amount === 0) {
      alert("Custom Amount (구현 필요)");
      return;
    }
    if (window.confirm(`Are you sure you want to support with $${amount}?`)) {
      const { error } = await supabase.from("donate").insert({
        challenge_id: challengeId,
        user_id: user?.id,
        amount,
      });
      if (error) {
        alert("Failed to support: " + error.message);
      } else {
        alert("Thank you for your support!");
        setAmountLoading(true);
        supabase
          .from("donate")
          .select("amount")
          .eq("challenge_id", challengeId)
          .then(({ data, error }) => {
            if (!error) {
              const sum = (data || []).reduce(
                (acc, row) => acc + (row.amount || 0),
                0
              );
              setAmount(sum);
            }
            setAmountLoading(false);
          });
        setSupportersLoading(true);
        supabase
          .from("donate")
          .select("user_id, amount, created_at, public_profiles(user_name)")
          .eq("challenge_id", challengeId)
          .order("created_at", { ascending: false })
          .limit(20)
          .then(({ data, error }) => {
            if (!error) {
              const seen = new Set();
              const unique: Supporter[] = [];
              for (const row of data || []) {
                if (!row.user_id || seen.has(row.user_id)) continue;
                seen.add(row.user_id);
                unique.push({
                  user_id: row.user_id,
                  amount: row.amount,
                  created_at: row.created_at,
                  public_profiles: Array.isArray(row.public_profiles)
                    ? row.public_profiles[0]
                    : row.public_profiles ?? null,
                });
                if (unique.length >= 5) break;
              }
              setSupporters(unique);
            }
            setSupportersLoading(false);
          });
      }
    }
  };
  const handleShare = () => {
    alert("Share (구현 필요)");
  };

  return (
    <Card className="overflow-hidden lg:sticky lg:top-24">
      <CardContent className="p-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-black-500 font-bold text-xl">
            $
            {amountLoading
              ? "..."
              : amountError
              ? "-"
              : `${amount?.toLocaleString()}`}{" "}
            raised
          </span>
        </div>
        {/* 100$ 기준 게이지바 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all"
              style={{
                width:
                  amountLoading || amountError
                    ? "0%"
                    : `${Math.min(
                        100,
                        Math.round(((amount || 0) / 100) * 100)
                      )}%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-medium min-w-[36px] text-right">
            {amountLoading
              ? "..."
              : amountError
              ? "-"
              : `${Math.min(100, Math.round(((amount || 0) / 100) * 100))}%`}
          </span>
        </div>
        <div className="flex justify-between items-center mb-6 text-sm text-zinc-600">
          <span>{/* {formattedGoal} goal */}</span>
          <span>{/* {challenge.supporters} supporters */}</span>
        </div>
        <div className="space-y-3 mb-6">
          <Button
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            onClick={() => handleSupport(10)}
          >
            Support with $10
          </Button>
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => handleSupport(25)}
          >
            Support with $25
          </Button>
          <Button
            className="w-full bg-teal-700 hover:bg-teal-800 text-white"
            onClick={() => handleSupport(50)}
          >
            Support with $50
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSupport(0)}
          >
            Custom Amount
          </Button>
        </div>
        <div className="mb-4 pt-6 border-t border-zinc-100">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        {/* Recent Supporters Section */}
        <div className="pt-6 border-t border-zinc-100">
          <h3 className="font-medium mb-4">Recent Supporters</h3>
          <div className="space-y-4">
            {supportersLoading ? (
              <div className="text-zinc-400">Loading...</div>
            ) : supportersError ? (
              <div className="text-red-500">{supportersError}</div>
            ) : supporters.length === 0 ? (
              <div className="text-zinc-400">Be the first supporter!</div>
            ) : (
              supporters.map((supporter, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback>
                      {supporter.public_profiles?.user_name
                        ? supporter.public_profiles.user_name.charAt(0)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {supporter.public_profiles?.user_name || "Unknown"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600">
                        ${supporter.amount}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {supporter.created_at
                          ? new Date(supporter.created_at).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
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
  );
}
