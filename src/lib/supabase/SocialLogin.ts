import { supabase } from "./SupabaseClient";

export const SocialLogin = async (provider: "google" | "apple") => {
  const currentPath = window.location.pathname + window.location.search;
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `http://localhost:5173/auth?redirect=${currentPath}`,
    },
  });
  if (error) {
    console.log(error);
  }
};

// `${
//         import.meta.env.VITE_BASE_URL
//       }/auth?redirect=${currentPath}`
// http://localhost:3000/?error=invalid_request&error_code=bad_oauth_state&error_description=OAuth+callback+with+invalid+state
