import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-slate-600">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          <p className="mb-4">
            <strong>Odd2Tips</strong> stands out as a versatile platform
            tailored for both seasoned tipsters and betting enthusiasts alike.
            It features specialized rooms called
            <strong>Tipster Rooms</strong> designed to foster connections
            between tipsters and their audience, enabling a vibrant community
            interaction, effective marketing of betting insights, and
            streamlined creation, management, and downloading of betslips.
          </p>
          <p className="mb-4">
            The platform also extends its utility to casual visitors, offering
            the convenience of instant betslip creation and download without the
            necessity for registration, thereby simplifying the betting process
            for users seeking to quickly leverage expert tips.
          </p>
          <p className="mb-4">
            Moreover, Odd2Tips enriches the betting experience by incorporating
            up-to-the-minute football news, catering to the informational needs
            of football fans and ensuring users are well-informed on the latest
            developments in the world of football.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
