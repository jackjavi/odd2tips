import Container from "@/app/blog/_components/container";
import { Intro } from "@/app/blog/_components/intro";
import Fetch from "@/app/blog/_components/fetch";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Metadata } from "next";
import Script from "next/script";

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
      <Navbar />
      <main>
        <Container>
          <Intro />
          <Fetch />
        </Container>
      </main>
      <Footer />

      <Script
        type="text/javascript"
        async
        src="//pl23430474.highcpmgate.com/d4/db/06/d4db06bc86d5410193a1ac45bef7482a.js"
      />
    </div>
  );
}
