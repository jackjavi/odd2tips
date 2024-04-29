import React from "react";
import Image from "next/image";

const createDownloadBanner: React.FC = () => {
  return (
    <section className="bg-teal-600  mx-auto text-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center">
      <div className="text-center flex flex-col md:flex-row items-center justify-center">
        <div className="font-bold text-lg font-Inter md:text-3xl p-8 text-[#5e17eb]">
          <span className="text-[whitesmoke]">CREATE</span> CUSTOMIZE AND{" "}
          <span className="text-[whitesmoke]">DOWNLOAD BETSLIPS</span> FOR FREE
          WITHOUT REGISTRATION
        </div>
        <div className="h-[50vh]">
          <Image
            src="/assets/betslip/betslip-banner.png"
            alt="Create, Customize and Download"
            height={1000}
            width={500}
          />
        </div>
      </div>
    </section>
  );
};

export default createDownloadBanner;
