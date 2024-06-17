import Container from "@/app/blog/_components/container";
import { Intro } from "@/app/blog/_components/intro";
import Fetch from "@/app/blog/_components/fetch";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Football latest trending news",
  description:
    "Get the latest trending news in the football world. Stay updated with the latest news, fixtures, and results. Top Leagues - English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more.",
  keywords: [
    "football, news, trending, fixtures, results, premier league, la liga, serie a, bundesliga, ligue 1",
  ],
};

export default function Index() {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-2242Y4EH8R" />
      <Navbar />
      <main>
        <Container>
          p
          <Intro />
          <Fetch />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
