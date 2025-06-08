import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/SupabaseClient";
import { useEffect, useState } from "react";
import { FailCard } from "@/components/FailCard";

const ThirdBlock = () => {
  const [failures, setFailures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFailures = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("state", "fail")
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) {
        setError(error.message);
        setFailures([]);
      } else {
        setFailures(data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchFailures();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-3">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-200">
            Failure Archive
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Learn From Beautiful Failures
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Our archive of failures is a treasure trove of learning. Discover
            what didn't work and why.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : failures.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            No failed challenges found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
            {failures.map((fail, idx) => (
              <FailCard key={fail.id} fail={fail} idx={idx} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" className="group">
            Explore the failure archive
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThirdBlock;
