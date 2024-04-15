import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-slate-900 hover:to-slate-500 py-20 px-[10vw]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto ">
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
              <a href="/rooms" className="hover:underline">
                Tipster Rooms
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline">
                News
              </a>
            </li>
            <li>
              <a href="/#chat" className="hover:underline">
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
      <div className="text-center mt-8 pt-4">
        <p>&copy; {new Date().getFullYear()} Odd2Tips. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
