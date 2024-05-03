import FixturesComponent from "./FixturesComponent";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const FixturesPage: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <Navbar />
      <main mx-auto>
        <div className="md:w-2/3">
          <FixturesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FixturesPage;
