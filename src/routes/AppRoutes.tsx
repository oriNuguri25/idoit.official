import { Route, Routes } from "react-router-dom";
import CreateMain from "../pages/CreateProject/CreateMain";
import MainPage from "../pages/MainPage/MainPage";
import ChallengeMain from "@/pages/ChallengeDetail/ChallengeMain";
import AuthRedirectPage from "@/pages/Auth/AuthRedirectPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthRedirectPage />} />
      <Route path="/create" element={<CreateMain />} />
      <Route path="/challenge/:id" element={<ChallengeMain />} />
    </Routes>
  );
};

export default AppRoutes;
