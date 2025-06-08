import { ExperimentCard } from "@/components/ExperimentCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useEffect, useState } from "react";

const SecondBlock = () => {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [amountMap, setAmountMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiments = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("challenges")
        .select("*, public_profiles(user_name)")
        .eq("state", "do")
        .limit(3);

      console.log("[DEBUG] challenges + public_profiles:", data);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setExperiments(data || []);

      // 챌린지 id 리스트 추출
      const ids = (data || []).map((c: any) => c.id);
      if (ids.length === 0) {
        setAmountMap({});
        setLoading(false);
        return;
      }
      // donate에서 group by challenge_id, sum(amount)
      const { data: donateData, error: donateError } = await supabase
        .from("donate")
        .select("challenge_id, amount")
        .in("challenge_id", ids);
      if (donateError) {
        setError(donateError.message);
        setLoading(false);
        return;
      }
      // 합계 계산
      const map: Record<string, number> = {};
      (donateData || []).forEach((row: any) => {
        if (!row.challenge_id || typeof row.amount !== "number") return;
        map[row.challenge_id] = (map[row.challenge_id] || 0) + row.amount;
      });
      setAmountMap(map);
      setLoading(false);
    };

    fetchExperiments();
  }, []);

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
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experiments.map((exp) => (
              <ExperimentCard
                id={exp.id}
                key={exp.id}
                title={exp.title}
                subtitle={exp.subtitle}
                creator={exp.public_profiles?.user_name || "Unknown"}
                description={exp.description}
                image={
                  Array.isArray(exp.cover_image)
                    ? exp.cover_image
                    : typeof exp.cover_image === "string"
                    ? JSON.parse(exp.cover_image)
                    : []
                }
                category={exp.category}
                color={exp.color || "from-teal-500 to-emerald-500"}
                likes={exp.likes || 0}
                comments={exp.comments || 0}
                likedByMe={exp.likedByMe || false}
                amount={amountMap[exp.id] || 0}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-8">
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            onClick={() => (window.location.href = "/challenges")}
          >
            Show more
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SecondBlock;
