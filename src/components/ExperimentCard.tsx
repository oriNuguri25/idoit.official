import { Heart, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ExperimentCardProps {
  title: string;
  creator: string;
  description: string;
  donationAmount: number;
  donationGoal: number;
  image: string;
  category: string;
  color: string;
}

export function ExperimentCard({
  title,
  creator,
  description,
  donationAmount,
  image,
  category,
}: ExperimentCardProps) {
  const formattedDonation = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(donationAmount);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="relative">
        <div className="relative h-48">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/80 text-zinc-800 hover:bg-white/90">
              {category}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
              <span className="text-sm font-medium text-white">
                ${donationAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{creator.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-zinc-500">@{creator}</span>
        </div>

        <div className="h-14 mb-2">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-teal-600 transition-colors">
            {title}
          </h3>
        </div>

        <div className="h-10 mb-4">
          <p className="text-zinc-600 line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-zinc-500 hover:text-teal-600 hover:bg-teal-50 p-0"
            >
              <Heart className="h-4 w-4" /> 42
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-zinc-500 hover:text-teal-600 hover:bg-teal-50 p-0"
            >
              <MessageSquare className="h-4 w-4" /> 18
            </Button>
          </div>

          <div className="text-sm font-medium text-zinc-800">
            {formattedDonation}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
