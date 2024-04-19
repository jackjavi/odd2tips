import React from "react";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <div className="px-4 py-12 h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center mb-4 bg-opacity-20 bg-cover bg-center bg-no-repeat rounded-lg p-6 ">
        <h1 className="drop-shadow-lg font-montserrat text-4xl sm:text-5xl md:text-9xl font-extrabold tracking-5 leading-wider md:pr-8 animate-pulse text-blue-400 ">
          ODD 2 TIPS
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
      <div className="max-w-4xl mx-auto text-center font-montserrat ">
        <p className="drop-shadow-lg text-2xl md:text-5xl text-blue-400  mb-4 tracking-wider leading-wider ">
          Tipster-led rooms, exclusive odds, and dynamic betslip downloads.
          Subscribe for insights, growth hacks, and digital edge.
        </p>
        {/*<p className="text-lg md:text-xl text-[whitesmoke] mb-8 leading-wide tracking-wide">
          Subscribe to our newsletter to receive instructions on how to leverage
          our platform to acquire new clients, have a portfolio as a
          professional tipster, and gain global reach.
</p>*/}

        <Link
          href="/rooms"
          className="mt-8 inline-block text-xl md:text-3xl bg-gradient-to-r from-violet-900 to-green-500 text-white rounded-full px-6 py-7 font-bold shadow-lg hover:bg-black hover:scale-110 transition-colors"
        >
          Explore Tipsters
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
