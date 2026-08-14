"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ArrowLeftRight,
  ShieldCheck,
  Wallet,
  Users,
  Settings,
  Plus,
} from "lucide-react";

interface SidebarProps {
  variant?: "asset" | "procurement" | "investment";
}

const assetNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Assets",
    href: "/assets",
    icon: Building2,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Audits",
    href: "/audits",
    icon: ShieldCheck,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    name: "User Management",
    href: "/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const procurementNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Assets",
    href: "/assets",
    icon: Building2,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Audits",
    href: "/audits",
    icon: ShieldCheck,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
const investmentNavigation = procurementNavigation;
export default function Sidebar({
  variant = "asset",
}: SidebarProps) {
  const pathname = usePathname();

  const navigationItems =
  variant === "procurement" || variant === "investment"
    ? procurementNavigation
    : assetNavigation;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-[#292d2f] text-white">
{/* =====================================================
      BRAND / LOGO
====================================================== */}
<div className="border-b border-white/10 px-5 py-6">
  <Link
    href="/dashboard"
    className="flex items-center gap-3 no-underline"
    aria-label="D-AssetPro Dashboard"
  >
    {/* DreamMore Logo */}
    <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-md bg-white">
      <Image
        src="/dreammore-logo.png"
        alt="DreamMore"
        fill
        priority
        className="object-contain p-[3px]"
        sizes="52px"
      />
    </div>

    {/* Brand Text */}
    <div className="min-w-0 flex-1">
      <p className="truncate text-[21px] font-bold leading-tight tracking-tight text-white no-underline">
        D-AssetPro
      </p>

      <p className="mt-1 truncate text-[12px] font-medium leading-tight text-[#aeb7d5] no-underline">
        Enterprise Management
      </p>
    </div>
  </Link>
</div>
      {/* =====================================================
          MAIN MENU
      ====================================================== */}
      <nav className="flex-1 px-4 pt-10">
        {/* Section title */}
        <p className="mb-6 px-5 text-[14px] font-medium uppercase tracking-[0.14em] text-[#858ca5]">
          Main Menu
        </p>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex h-[48px] items-center gap-4 rounded-md px-5 transition-all duration-150 ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-[#b8bfd9] hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {/* Orange active indicator */}
                {isActive && (
                  <span className="absolute left-[-16px] top-0 h-full w-[4px] rounded-r-md bg-[#ff7135]" />
                )}

                {/* Icon */}
                <Icon
                  className={`h-[22px] w-[22px] shrink-0 transition-colors duration-150 ${
                    isActive
                      ? "text-white"
                      : "text-[#b8bfd9] group-hover:text-white"
                  }`}
                  strokeWidth={2}
                />

                {/* Menu text */}
                <span
                  className={`whitespace-nowrap text-[16px] leading-none transition-colors duration-150 ${
                    isActive
                      ? "font-semibold text-white"
                      : "font-medium text-[#b8bfd9] group-hover:text-white"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          ADD NEW ASSET
      ====================================================== */}
      <div className="border-t border-white/[0.08] p-5">
        <Link
          href="/assets"
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-lg bg-[#ff7135] px-4 text-[15px] font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#f26327] hover:shadow-md active:scale-[0.99]"
        >
          <Plus
            className="h-[20px] w-[20px]"
            strokeWidth={2.5}
          />

          <span>Add New Asset</span>
        </Link>
      </div>
    </aside>
  );
}