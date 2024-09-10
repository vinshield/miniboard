import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container sticky w-full border-b py-3">
      <nav className="md:flex-between w-full max-w-xs">
        <Link href="/" className="text-base font-bold text-[#757b85]">
          miniboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
