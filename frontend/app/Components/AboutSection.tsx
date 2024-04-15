import React from "react";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <div className="px-4 py-12 h-[85vh] flex flex-col items-center justify-center">
      <div className="text-center mb-8 bg-opacity-20 bg-cover bg-center bg-no-repeat rounded-lg p-6 ">
        <h1 className="text-5xl md:text-8xl font-bold tracking-wide leading-10 md:pr-8 animate-pulse text-[whitesmoke]">
          Odd2Tips
        </h1>
        {/*<p className="mt-4 text-xl text-[whitesmoke] animate-pulse">
          The ultimate sports prediction platform
        </p>
        <div className="mt-4">
          <Link
            href="/rooms"
            className="inline-block bg-green-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:bg-green-700 transition-colors"
          >
            Explore Tipsters
          </Link>
  </div>*/}
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl text-[whitesmoke] mb-4">
          We are a platform that enables tipsters to have a global reach of
          clients and also allows clients to get the best odds from top tipsters
          with a winning record.
        </p>
        <p className="text-lg md:text-xl text-[whitesmoke] mb-8">
          Subscribe to our newsletter to receive instructions on how to leverage
          our platform to acquire new clients, have a portfolio as a
          professional tipster, and gain global reach.
        </p>

        <Link
          href="/rooms"
          className="inline-block bg-green-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:bg-green-700 transition-colors"
        >
          Explore Tipsters
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
