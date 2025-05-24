import { supabase } from "./SupabaseClient";

export type ChallengeForm = {
  user_id: string;
  title: string;
  duration: string;
  category: string;
  cover_image: string[];
  story: string[];
};

export async function saveChallengeToSupabase(form: ChallengeForm) {
  const { error } = await supabase.from("challenges").insert([
    {
      user_id: form.user_id,
      title: form.title,
      duration: form.duration,
      category: form.category,
      cover_image: form.cover_image,
      story: form.story,
    },
  ]);
  return error;
}

export async function uploadImagesToStorage(files: File[], userId: string) {
  const urls: string[] = [];
  for (const file of files) {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const { error } = await supabase.storage
      .from("challengeimage")
      .upload(filePath, file);
    if (error) throw error;
    const { data } = supabase.storage
      .from("challengeimage")
      .getPublicUrl(filePath);
    urls.push(data.publicUrl);
  }
  return urls;
}
