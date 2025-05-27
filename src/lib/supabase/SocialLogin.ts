import { supabase } from "./SupabaseClient";

export const SocialLogin = async (provider: "google" | "apple") => {
  const currentPath = window.location.pathname + window.location.search;
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${
        import.meta.env.VITE_BASE_URL
      }/auth?redirect=${currentPath}`,
    },
  });
  if (error) {
    console.log(error);
  }
};
