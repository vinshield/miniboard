import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<header className='w-full'>
			<nav className='md:flex-between w-full max-w-xs'>
				<Link href='/'>Home</Link>
			</nav>
		</header>
	);
};

export default Header;
