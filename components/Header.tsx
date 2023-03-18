import Link from "next/link";
import { FaHippo } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow w-full">
      <div className="container mx-auto flex flex-row p-5 items-center justify-between">
        <Link className="flex items-center" href="/">
          <FaHippo className="text-2xl mr-2" />
          <span>Russo Trip</span>
        </Link>
        <nav>
          <ul className="flex flex-row space-x-8">
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/account/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}