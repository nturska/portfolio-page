"use client";

import Link from "next/link";
import { cv } from "../../public";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLocale } from "@/lib/hooks/useLocale";

export default function Navbar() {
  const { t } = useLocale();

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-12 border-b border-base-200">
      <div className="navbar-start w-auto">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight whitespace-nowrap"
        >
          Natalia Turska<span className="text-primary">.com</span>
        </Link>
      </div>

      <div className="navbar-end flex-1 gap-2">
        <ul className="menu menu-horizontal flex-nowrap px-1 font-medium hidden lg:flex">
          <li>
            <Link href="#timeline">{t("nav.timeline")}</Link>
          </li>
          <li>
            <Link href="#recommendations">{t("nav.recommendations")}</Link>
          </li>
          <li>
            <Link href="#certificates">{t("nav.certificates")}</Link>
          </li>
          <li>
            <Link href="#projects">{t("nav.projects")}</Link>
          </li>
          <li>
            <Link href="#contact">{t("nav.contact")}</Link>
          </li>
        </ul>
        <ThemeToggle />
        <a
          href={cv}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm md:btn-md"
        >
          {t("nav.downloadCv")}
        </a>
      </div>
    </div>
  );
}
