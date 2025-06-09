import { Route, Routes } from "react-router-dom";
import CreateMain from "../pages/CreateProject/CreateMain";
import MainPage from "../pages/MainPage/MainPage";
import ChallengeMain from "@/pages/ChallengeDetail/ChallengeMain";
import AuthRedirectPage from "@/pages/Auth/AuthRedirectPage";
import Challenges from "@/pages/Challenges/Challenges";
import FailureChallenge from "@/pages/Failure/FailureChallenge";
import AboutUs from "@/pages/Aboutus/AboutUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthRedirectPage />} />
      <Route path="/create" element={<CreateMain />} />
      <Route path="/challenge/:id" element={<ChallengeMain />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/archive" element={<FailureChallenge />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
  );
};

export default AppRoutes;
