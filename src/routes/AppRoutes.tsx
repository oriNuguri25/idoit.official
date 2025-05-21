import { Route, Routes } from "react-router-dom";
import CreateMain from "../pages/CreateProject/CreateMain";
import MainPage from "../pages/MainPage/MainPage";
import ChallengeMain from "@/pages/ChallengeDetail/ChallengeMain";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/create" element={<CreateMain />} />
      <Route path="/challenge/:id" element={<ChallengeMain />} />
    </Routes>
  );
};

export default AppRoutes;
