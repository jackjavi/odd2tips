import Image from "next/image";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-[whitesmoke] py-20 px-[10vw]  ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto ">
        {/* About Section */}
        <div className="flex flex-col text-slate-200 justify-center items-center">
          <Image src="/logo.png" alt="Logo-SVG" width={100} height={100} />
          <p className="text-center text-teal-500">
            Your premier destination for sports predictions and live chat.
            Engage, predict, and win!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-teal-500 justify-center items-center">
          <h2 className="font-bold text-lg mb-2 text-teal-500">Quick Links</h2>
          <ul className="flex gap-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/rooms" className="hover:underline">
                Tipster Rooms
              </a>
            </li>
            <li>
              <a href="/betslip" className="hover:underline">
                Betslip
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                News
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col  justify-center items-center">
          <h2 className="font-bold text-lg mb-2 text-teal-500">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500"
            >
              <FaTelegramPlane />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black "
            >
              <FaTiktok />
            </a>

            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col text-teal-500 justify-center items-center">
          <h2 className="font-bold text-lg mb-2 ">Contact Us</h2>
          <ul>
            <li>Email: oddtwotips@gmail.com</li>
            <li>Phone: +254 700 566 210</li>
          </ul>
        </div>
      </div>

      {/* Legal Notice 
      <div className="text-center mt-8 pt-4 text-teal-500">
        <p>&copy; {new Date().getFullYear()} Odd2Tips. All rights reserved.</p>
      </div>
    </div>*/}
  );
};

export default Footer;
