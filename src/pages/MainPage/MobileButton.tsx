import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const MobileButton = () => {
  return (
    <div className="fixed bottom-6 right-6 md:hidden">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-teal-500 hover:bg-teal-600 shadow-lg"
      >
        <PlusCircle className="h-6 w-6" />
        <span className="sr-only">Start your journey</span>
      </Button>
    </div>
  );
};

export default MobileButton;
