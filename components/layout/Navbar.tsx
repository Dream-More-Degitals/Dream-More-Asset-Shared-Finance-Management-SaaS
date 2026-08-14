"use client";

import Image from "next/image";
import {
  Search,
  Bell,
  CircleHelp,
  Settings,
} from "lucide-react";

type NavbarProps = {
  searchPlaceholder?: string;
  userName?: string;
  userRole?: string;
  profileImage?: string;
  showSettings?: boolean;
};

export default function Navbar({
  searchPlaceholder = "Search assets, IDs, or categories...",
  userName = "Alex Thompson",
  userRole = "SENIOR ADMIN",
  profileImage = "/alex-thompson.avif",
  showSettings = false,
}: NavbarProps) {
  return (
    <header
      className="
        flex
        h-[76px]
        w-full
        shrink-0
        items-center
        justify-between
        border-b
        border-[#e5e7eb]
        bg-[#f8fafc]
        px-8
      "
    >
      {/* =====================================================
          SEARCH
      ====================================================== */}
      <div className="relative w-[510px] max-w-[42vw]">
        <Search
          className="
            absolute
            left-5
            top-1/2
            h-6
            w-6
            -translate-y-1/2
            text-[#29425f]
          "
          strokeWidth={2}
        />

        <input
          type="text"
          placeholder={searchPlaceholder}
          className="
            h-[52px]
            w-full
            rounded-lg
            border
            border-[#e8bfae]
            bg-white
            pl-16
            pr-5
            text-[16px]
            text-[#1f2937]
            outline-none
            placeholder:text-[#718096]
            focus:border-[#ff7135]
            focus:ring-1
            focus:ring-[#ff7135]
          "
        />
      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}
      <div className="flex h-full items-center">

        {/* =================================================
            NOTIFICATION
        ================================================== */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            text-[#29425f]
            transition-colors
            hover:bg-[#eef1f4]
          "
        >
          <Bell
            className="h-6 w-6"
            strokeWidth={2}
          />

          {/* Notification dot */}
          <span
            className="
              absolute
              right-[7px]
              top-[7px]
              h-[9px]
              w-[9px]
              rounded-full
              bg-[#ff7135]
            "
          />
        </button>

        {/* =================================================
            HELP
        ================================================== */}
        <button
          type="button"
          aria-label="Help"
          className="
            ml-5
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            text-[#29425f]
            transition-colors
            hover:bg-[#eef1f4]
          "
        >
          <CircleHelp
            className="h-6 w-6"
            strokeWidth={2}
          />
        </button>

        {/* =================================================
            SETTINGS
            Procurement / pages that need settings
        ================================================== */}
        {showSettings && (
          <button
            type="button"
            aria-label="Settings"
            className="
              ml-5
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-[#29425f]
              transition-colors
              hover:bg-[#eef1f4]
            "
          >
            <Settings
              className="h-6 w-6"
              strokeWidth={2}
            />
          </button>
        )}

        {/* =================================================
            DIVIDER
        ================================================== */}
        <div className="mx-6 h-[44px] w-px bg-[#e5bbaa]" />

        {/* =================================================
            USER
        ================================================== */}
        <div className="flex items-center gap-4">

          {/* User information */}
          <div className="text-right">
            <p
              className="
                text-[16px]
                font-semibold
                leading-tight
                text-[#111827]
              "
            >
              {userName}
            </p>

            <p
              className="
                mt-1
                text-[12px]
                font-medium
                tracking-[0.04em]
                text-[#6b7280]
              "
            >
              {userRole}
            </p>
          </div>

          {/* Profile image */}
          <div
            className="
              relative
              h-[52px]
              w-[52px]
              shrink-0
              overflow-hidden
              rounded-full
              border-2
              border-[#ff7135]
              bg-white
            "
          >
            <Image
              src={profileImage}
              alt={userName}
              fill
              className="object-cover"
              sizes="52px"
            />
          </div>
        </div>
      </div>
    </header>
  );
}