const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white h-screen md:h-[30vh]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Odd2Tips</h2>
            <p>
              Your premier destination for sports predictions and live chat.
              Engage, predict, and win!
            </p>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
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
          <div>
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
