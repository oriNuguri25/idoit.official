import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface ChallengeFormData {
  user_id: string;
  title: string;
  duration: string;
  category: string;
  coverImages: File[];
  story: string[];
}

export const useSubmitChallenge = () =>
  useMutation({
    mutationFn: async (form: ChallengeFormData) => {
      const formData = new FormData();
      formData.append("user_id", form.user_id);
      formData.append("title", form.title);
      formData.append("duration", form.duration);
      formData.append("category", form.category);
      form.story.forEach((s, index) => {
        formData.append(`story[${index}]`, s);
      });
      form.coverImages.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.post("/api/challengeUpload", formData);
      return res.data;
    },
  });
