import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface FailCardProps {
  fail: any;
  idx: number;
}

export function FailCard({ fail, idx }: FailCardProps) {
  return (
    <Link to={`/challenge/${fail.id}`} className="block group">
      <Card
        className={
          "relative group overflow-hidden rounded-2xl border-0 shadow-none bg-transparent p-0 " +
          (idx === 0 ? "col-span-2 row-span-2" : "")
        }
      >
        <img
          src={
            Array.isArray(fail.cover_image)
              ? fail.cover_image[0] || "/placeholder.svg"
              : typeof fail.cover_image === "string"
              ? JSON.parse(fail.cover_image)[0] || "/placeholder.svg"
              : "/placeholder.svg"
          }
          alt={fail.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <CardContent className="absolute inset-0 p-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className={idx === 0 ? "p-6" : "p-4"}>
            <Badge className="self-start mb-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              {fail.category}
            </Badge>
            <h3
              className={
                idx === 0
                  ? "text-xl font-bold text-white mb-1"
                  : "text-sm font-bold text-white"
              }
            >
              {fail.title}
            </h3>
            {idx === 0 && (
              <p className="text-white/80 text-sm mb-2 line-clamp-2">
                {fail.description}
              </p>
            )}
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6 border border-white/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {fail.public_profiles?.user_name
                    ? fail.public_profiles.user_name.charAt(0)
                    : "?"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-white/80">
                @{fail.public_profiles?.user_name || "unknown"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
