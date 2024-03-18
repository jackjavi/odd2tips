import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Odd2Tips</div>
        <div>
          <Link className="px-4" href="/">
            Home
          </Link>
          <Link className="px-4" href="/predictions">
            Predictions
          </Link>
          <Link className="px-4" href="/news">
            News
          </Link>
          <Link className="px-4" href="/chat">
            Chat
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
