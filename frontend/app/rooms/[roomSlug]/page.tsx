"use client";

import React, { useState } from "react";
import Daily2Odds from "@/app/Components/Daily2Odds";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type RoomComponentProps = {};

const RoomComponent: React.FC<RoomComponentProps> = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const router = useRouter();
  const { roomSlug } = useParams();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const handleButtonClick = (section: string) => {
    if (section === "Settings") {
      router.push(`/rooms/${roomSlug}/dashboard?roomId=${roomId}`);
    } else {
      setActiveModal(section);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const Modal = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="md:absolute md:right-0 md:top-0 md:bottom-0 md:h-screen  md:w-2/3 bg-[whitesmoke] text-teal-600 font-playfair flex justify-center items-center p-4">
      <div className=" p-4 shadow-lg w-full h-auto ">
        <h2 className="text-xl mb-2 font-semibold">{title}</h2>
        {children}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="flex flex-col md:flex-row bg-[whitesmoke] w-full">
        {/* Navigation Section */}
        <div className="w-full md:w-1/3 p-4 bg-gray-50 overflow-y-auto">
          <section
            id="stats"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-[#5e17eb]mb-3">
              Stats - Winning Record
            </h2>
            <button
              onClick={() => handleButtonClick("Stats")}
              className="px-4 py-2 bg-[#5e17eb] text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              View Stats
            </button>
          </section>

          <section
            id="about"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-[#5e17eb] mb-3">About</h2>
            <button
              onClick={() => handleButtonClick("About")}
              className="px-4 py-2 bg-[#5e17eb] text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Learn More
            </button>
          </section>

          <section
            id="social-links"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-[#5e17eb] mb-3">
              Room Social Links
            </h2>
            <button
              onClick={() => handleButtonClick("SocialLinks")}
              className="px-4 py-2 bg-[#5e17eb] text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Explore
            </button>
          </section>

          <section
            id="todays-tip"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              Today&apos;s Tip
            </h2>
            <button
              onClick={() => handleButtonClick("TodaysTip")}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Discover
            </button>
          </section>

          <section
            id="future-tips"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              Unlock Future Tips
            </h2>
            <button
              onClick={() => handleButtonClick("FutureTips")}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Unlock
            </button>
          </section>

          <section
            id="settings"
            className="mb-6 p-4 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-2xl font-bold text-[#5e17eb] mb-3">Settings</h2>
            <button
              onClick={() => handleButtonClick("Settings")}
              className="px-4 py-2 bg-[#5e17eb] text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Configure
            </button>
          </section>
        </div>

        {/* Content/Modal Section */}
        {activeModal === "TodaysTip" && (
          <Modal title="Today's Tip">
            <Daily2Odds roomId={roomId} />
          </Modal>
        )}
      </main>
      <Footer />
    </>
  );
};

export default RoomComponent;
