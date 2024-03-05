"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const urlpath = usePathname();
  return (
    <div>
      <div>
        <Link href="/">home{urlpath === "/" ? "🐥" : ""}</Link>
      </div>
      <div>
        <Link href="/about">about{urlpath === "/about" ? "🐥" : ""}</Link>
      </div>
    </div>
  );
}
