import { useState } from "react";
import { Heart as HeartFilled, MessageSquare } from "lucide-react";
import { Heart as HeartOutline } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface ExperimentCardProps {
  id: string;
  title: string;
  subtitle?: string;
  creator: string;
  description: string;
  image: string[];
  category: string;
  color: string;
  likes?: number;
  comments?: number;
  likedByMe?: boolean;
  amount?: number;
}

export function ExperimentCard({
  id,
  title,
  creator,
  description,
  image,
  category,
  likes = 0,
  comments = 0,
  likedByMe = false,
  amount,
}: ExperimentCardProps) {
  const [liked, setLiked] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    // TODO: 서버에 좋아요 상태 반영 API 호출 필요
  };

  const imageUrl =
    Array.isArray(image) &&
    image.length > 0 &&
    image[0] &&
    typeof image[0] === "string" &&
    image[0].trim() !== ""
      ? image[0]
      : "/placeholder.svg";

  return (
    <Link to={`/challenge/${id}`} className="block group">
      <Card className="w-full max-w-[480px] mx-auto flex flex-col h-[500px] overflow-hidden rounded-2xl bg-white border border-zinc-100 shadow-md hover:shadow-xl transition-all group pt-0 pb-2 cursor-pointer">
        <div
          className="relative w-full flex-shrink-0 flex-grow-0"
          style={{ flexBasis: "40%" }}
        >
          <div className="aspect-[3/2] w-full">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full rounded-t-2xl bg-zinc-100"
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-white/90 text-teal-700 border border-teal-100 shadow-sm px-2 py-0.5 text-xs font-semibold">
                {category}
              </Badge>
            </div>
            {typeof amount === "number" && (
              <div className="absolute bottom-2 right-2 z-10">
                <span className="bg-white/90 text-emerald-700 border border-emerald-100 shadow-sm px-2 py-0.5 text-xs font-semibold rounded-md">
                  ${amount.toLocaleString()} raised
                </span>
              </div>
            )}
          </div>
        </div>
        <CardContent className="flex flex-col flex-1 justify-between pt-0 pb-4 px-4 gap-1 min-h-0">
          <div>
            <h3 className="text-base md:text-lg font-bold text-zinc-700 line-clamp-1 group-hover:text-teal-600 transition-colors">
              {title}
            </h3>
            <p className="text-zinc-500 text-sm md:text-base line-clamp-2 mb-0">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <Avatar className="h-8 w-8 border border-white shadow-sm">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{creator.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-base text-zinc-700 font-semibold">
              {creator}
            </span>
            <div className="flex-1" />
            <button
              className={`flex items-center gap-1 transition-colors duration-200 ${
                liked ? "text-rose-500" : "text-zinc-400 hover:text-rose-400"
              } p-0`}
              onClick={handleLike}
              aria-label="Like"
            >
              {liked ? (
                <HeartFilled className="h-5 w-5 fill-rose-500 animate-pulse" />
              ) : (
                <HeartOutline className="h-5 w-5" />
              )}
              <span className="text-base font-semibold min-w-[18px] text-center">
                {likeCount}
              </span>
            </button>
            <div className="flex items-center gap-1 text-zinc-400 ml-1">
              <MessageSquare className="h-5 w-5" />
              <span className="text-base font-semibold min-w-[18px] text-center">
                {comments}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
