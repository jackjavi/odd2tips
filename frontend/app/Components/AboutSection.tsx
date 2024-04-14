// AboutSection.tsx
import React from "react";

const AboutSection: React.FC = () => {
  return (
    <div className="px-4 py-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[whitesmoke] mb-4">
          Who We Are
        </h2>
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
        <a
          href="#subscribe"
          className="inline-block bg-white text-blue-700 font-semibold rounded-lg text-lg px-8 py-3 hover:bg-gray-100 transition-colors"
        >
          Subscribe to Newsletter
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
