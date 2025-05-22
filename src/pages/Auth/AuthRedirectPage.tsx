import { supabase } from "@/lib/supabase/SupabaseClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const doRedirect = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const redirectTo =
        new URLSearchParams(window.location.search).get("redirect") || "/";

      if (session) {
        navigate(redirectTo, { replace: true });
      } else {
        console.log("No session found");
        navigate("/", { replace: true });
      }
    };

    doRedirect();
  }, []);

  return <div></div>;
}
