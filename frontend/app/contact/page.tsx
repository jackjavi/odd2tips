import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-full  bg-gray-200 text-gray-700 py-24">
        <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
          <div className="pb-8 flex flex-col justify-center items-center">
            <p className="text-3xl sm:text-5xl font-valera font-bold inline">
              Contact
            </p>
            <p className="py-6" text-1xl font-lora>
              Submit the form below to get in touch with us
            </p>
          </div>

          <div className=" flex justify-center items-center">
            <form
              action="https://getform.io/f/ae834033-cf08-4bdf-abdc-879e5999abb2"
              method="POST"
              className=" flex flex-col w-full md:w-3/4"
            >
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="p-2 bg-gray-700 text-[whitesmoke] border-2 rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="my-4 p-2 bg-gray-700 text-[whitesmoke] border-2 rounded-m focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Enter your message"
                rows={10}
                className="p-2 bg-gray-700 text-[whitesmoke] border-2 rounded-md focus:outline-none"
              ></textarea>

              <button className="text-[whitesmoke] bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                Let's talk
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
