import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import investmentsPlay from "../Components/investmentsPlay";

const page = () => {
  return (
    <>
      <Navbar />
      <main>
        <investmentsPlay />
      </main>
      <Footer />
    </>
  );
};

export default page;
