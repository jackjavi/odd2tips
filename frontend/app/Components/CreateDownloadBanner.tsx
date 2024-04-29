import React from "react";
import Image from "next/image";

const createDownloadBanner: React.FC = () => {
  return (
    <section className="bg-teal-600  mx-auto text-white p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center">
        <div className="font-bold text-3xl p-8 text-teal-900">
          CREATE CUSTOMIZE AND DOWNLOAD BETSLIPS FOR FREE WITHOUT REGISTRATION
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
