import Link from "next/link";
import { cv } from "../../public";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 border-b border-base-200">
      <div className="navbar-start">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Natalia Turska<span className="text-primary">.com</span>
        </Link>
      </div>

      <div className="navbar-end gap-2">
        <ul className="menu menu-horizontal px-1 font-medium hidden sm:flex">
          <li>
            <Link href="#projects">Projekty</Link>
          </li>
          <li>
            <Link href="#contact">Kontakt</Link>
          </li>
        </ul>
        <a
          href={cv}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm md:btn-md"
        >
          Pobierz CV
        </a>
      </div>
    </div>
  );
}
