import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FifthBlock = () => {
  return (
    <section className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200 rounded-full opacity-50 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-200 rounded-full opacity-50 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1400px] mx-auto px-3 relative">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Embrace Failure?
            </h2>
            <p className="text-zinc-600 mb-6 max-w-xl mx-auto">
              Start your experiment today. Document your process. Learn from
              your mistakes.
              <span className="block font-medium mt-2">
                Remember: you're supposed to fail here.
              </span>
            </p>
            <Link to="/create">
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white cursor-pointer"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthBlock;
