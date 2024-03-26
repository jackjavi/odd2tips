import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white h-full ">
      <div className="container mx-auto px-4 py-8">
        <hr className="border-gray-700 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-gradient-to-b from-green-500 to-blue-600 py-2">
          {/* About Section */}
          <div className="flex flex-col text-slate-200 justify-center items-center">
            <Image src="/logo.png" alt="Logo-SVG" width={100} height={100} />
            <p className="text-center">
              Your premier destination for sports predictions and live chat.
              Engage, predict, and win!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col text-slate-200 justify-center items-center">
            <h2 className="font-bold text-lg mb-2">Quick Links</h2>
            <ul>
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/predictions" className="hover:underline">
                  Predictions
                </a>
              </li>
              <li>
                <a href="/news" className="hover:underline">
                  News
                </a>
              </li>
              <li>
                <a href="/chat" className="hover:underline">
                  Chat
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col text-slate-200 justify-center items-center">
            <h2 className="font-bold text-lg mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col text-slate-200 justify-center items-center">
            <h2 className="font-bold text-lg mb-2">Contact Us</h2>
            <ul>
              <li>Email: odd2tips@gmail.com</li>
              <li>Phone: +254 700 566 210</li>
            </ul>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} Odd2Tips. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
