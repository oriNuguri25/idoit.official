import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import MainHero from "./MainHero";
import FirstBlock from "./FirstBlock";
import SecondBlock from "./SecondBlock";
import ThirdBlock from "./ThirdBlock";
import FourthBlock from "./FourthBlock";
import FifthBlock from "./FifthBlock";
import MobileButton from "./MobileButton";

const MainPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Header />
      <main className="flex-1">
        {/* 히어로 섹션 */}
        <MainHero />
        <FirstBlock />
        <SecondBlock />
        <ThirdBlock />
        <FourthBlock />
        <FifthBlock />
      </main>
      <Footer />
      <MobileButton />
    </div>
  );
};

export default MainPage;
