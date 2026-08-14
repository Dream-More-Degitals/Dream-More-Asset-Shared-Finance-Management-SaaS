"use client";

import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: ReactNode;

  sidebarVariant?: "asset" | "procurement" | "investment";

  searchPlaceholder?: string;
  userName?: string;
  userRole?: string;
  profileImage?: string;
  showSettings?: boolean;
}

export default function DashboardLayout({
  children,
  sidebarVariant = "asset",
  searchPlaceholder = "Search assets, IDs, or categories...",
  userName = "Alex Thompson",
  userRole = "SENIOR ADMIN",
  profileImage = "/alex-thompson.avif",
  showSettings = false,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f7f9]">

      {/* Sidebar */}
      <Sidebar variant={sidebarVariant} />

      {/* Main application area */}
      <div className="ml-[240px] min-h-screen">

        {/* Navbar */}
        <Navbar
          searchPlaceholder={searchPlaceholder}
          userName={userName}
          userRole={userRole}
          profileImage={profileImage}
          showSettings={showSettings}
        />

        {/* Page content */}
        <main className="min-h-[calc(100vh-76px)]">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}