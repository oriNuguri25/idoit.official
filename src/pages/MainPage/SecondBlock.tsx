import { ExperimentCard } from "@/components/ExperimentCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useEffect, useState } from "react";

const SecondBlock = () => {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("challenges")
        .select("*, profiles:user_id (user_name)")
        .limit(6);

      console.log("[DEBUG] challenges+profiles data:", data);

      if (error) {
        setError(error.message);
      } else {
        setExperiments(data || []);
        if (data) {
          data.forEach((exp, idx) => {
            console.log(`[DEBUG] experiment #${idx}:`, exp);
            console.log(`[DEBUG]   user_id:`, exp.user_id);
            console.log(`[DEBUG]   profiles:`, exp.profiles);
            if (exp.profiles) {
              console.log(
                `[DEBUG]   profiles.user_name:`,
                exp.profiles.user_name
              );
            } else {
              console.log(`[DEBUG]   profiles is undefined or null`);
            }
          });
        }
      }
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
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View all experiments
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((exp) => (
              <ExperimentCard
                key={exp.id}
                title={exp.title}
                creator={exp.profiles?.user_name || "Unknown"}
                description={exp.description}
                image={exp.image}
                category={exp.category}
                color={exp.color || "from-teal-500 to-emerald-500"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SecondBlock;
