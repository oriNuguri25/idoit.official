import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "@/components/ConfirmModal";
import { Input } from "@/components/ui/input";

interface Supporter {
  user_id: string;
  amount: number;
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState(10);

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

  const handleSupport = (amount: number) => {
    if (!user && openLoginModal) {
      openLoginModal();
      return;
    }
    if (amount === 0) {
      setCustomOpen(true);
      setCustomValue(10);
      return;
    }
    setPendingAmount(amount);
    setConfirmOpen(true);
  };

  const handleCustomSubmit = () => {
    if (!customValue || isNaN(customValue) || customValue <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setCustomOpen(false);
    setPendingAmount(customValue);
    setConfirmOpen(true);
  };

  const handleConfirmSupport = async () => {
    if (!pendingAmount) return;
    setConfirmOpen(false);
    const amount = pendingAmount;
    setPendingAmount(null);
    const { error } = await supabase.from("donate").insert({
      challenge_id: challengeId,
      user_id: user?.id,
      name: userName,
      amount,
    });
    if (error) {
      alert("Failed to back: " + error.message);
    } else {
      alert("Thank you for your backing!");
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
  };

  const handleShare = () => {
    alert("Share (not implemented yet)");
  };

  return (
    <>
      {/* Custom Amount Modal */}
      {customOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setCustomOpen(false)}
        >
          <Card
            className="w-full max-w-xs md:max-w-sm relative rounded-2xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-2xl font-bold px-2 z-10"
              onClick={() => setCustomOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <CardContent className="flex flex-col items-center gap-6 pt-8 pb-6 px-6">
              <div className="w-full flex flex-col items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-zinc-900 text-center">
                  Enter your custom backing amount
                </span>
              </div>
              <Input
                type="number"
                min={1}
                value={customValue}
                onChange={(e) => setCustomValue(Number(e.target.value))}
                className="w-full text-center text-lg font-bold border-2 border-teal-200 focus:border-teal-500 rounded-xl px-4 py-3 outline-none"
                placeholder="Amount"
                autoFocus
              />
              <div className="flex gap-3 w-full mt-2">
                <button
                  className="flex-1 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-medium"
                  onClick={() => setCustomOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                  onClick={handleCustomSubmit}
                >
                  Next
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setPendingAmount(null);
        }}
        onConfirm={handleConfirmSupport}
        message={`Are you sure you want to back with $${pendingAmount ?? 0}?`}
        confirmText="Back now"
        cancelText="Cancel"
      />
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
              Back with $10
            </Button>
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => handleSupport(25)}
            >
              Back with $25
            </Button>
            <Button
              className="w-full bg-teal-700 hover:bg-teal-800 text-white"
              onClick={() => handleSupport(50)}
            >
              Back with $50
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSupport(0)}
            >
              Back with Custom Amount
            </Button>
          </div>
          <div className="mb-4 pt-6 border-t border-zinc-100">
            {/* 공유 기능 아직 구현 안함 */}
            {/* <Button
              variant="outline"
              className="w-full justify-center"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button> */}
          </div>
          {/* Recent Supporters Section */}
          <div className="pt-6 border-t border-zinc-100">
            <h3 className="font-medium mb-4">Recent Backers</h3>
            <div className="space-y-4">
              {supportersLoading ? (
                <div className="text-zinc-400">Loading...</div>
              ) : supportersError ? (
                <div className="text-red-500">{supportersError}</div>
              ) : supporters.length === 0 ? (
                <div className="text-zinc-400">Be the first backer!</div>
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
              See all backers
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
