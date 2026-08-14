"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e8bbaa] bg-[#f8fafc]">
      <div className="flex min-h-[76px] items-center justify-between px-8">
        {/* Left - Powered by DreamMore */}
        <Link
          href="/dashboard"
          className="flex items-center gap-4"
          aria-label="Powered by DreamMore"
        >
          <div className="relative h-[34px] w-[34px] shrink-0 overflow-hidden bg-white">
            <Image
              src="/dreammore-logo.png"
              alt="DreamMore"
              fill
              className="object-contain"
              sizes="34px"
            />
          </div>

          <span className="text-[18px] font-medium text-[#29425f]">
            Powered by DreamMore
          </span>
        </Link>

        {/* Center - Footer Links */}
        <nav
          className="flex items-center gap-12"
          aria-label="Footer navigation"
        >
          <Link
            href="/privacy"
            className="text-[17px] font-medium text-[#29425f] transition-colors hover:text-[#ff7135]"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-[17px] font-medium text-[#29425f] transition-colors hover:text-[#ff7135]"
          >
            Terms of Service
          </Link>

          <Link
            href="/support"
            className="text-[17px] font-medium text-[#29425f] transition-colors hover:text-[#ff7135]"
          >
            Contact Support
          </Link>
        </nav>

        {/* Right - Copyright */}
        <p className="whitespace-nowrap text-[17px] font-medium text-[#29425f]">
          © 2024 Enterprise Assets Inc.
        </p>
      </div>
    </footer>
  );
}