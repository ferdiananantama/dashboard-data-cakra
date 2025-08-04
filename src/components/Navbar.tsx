"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button"; // gunakan komponen Button shadcn/ui jika ada
import { useProfile } from "@/features/auth/hooks/useProfile";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const clearToken = useAuthStore((state) => state.clearToken);

  const profile = useProfile();

  const handleLogout = () => {
    clearToken();
    router.push("/auth/login/");
  };

  return (
    <header className="w-full border-b border-[#e6edf4] bg-slate-50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/dashboard/articles"
          className="flex items-center gap-2 text-[#0c151d]"
        >
          <div className="size-5">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9">
          {["Articles", "Categories"].map((text) => (
            <Link
              key={text}
              href={`/dashboard/${text.toLowerCase()}`}
              className="text-[#0c151d] text-sm font-medium"
            >
              {text}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Avatar & Name */}
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-sm font-medium text-[#0c151d]">
              {profile.data?.username || "Guest"}
            </span>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-400 hover:bg-red-100 hover:text-red-500 transition-colors hidden md:flex justify-center items-center"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="sr-only">Logout</span>
          </Button>

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="flex flex-col gap-3 mt-4 md:hidden animate-fade-in">
          {["Articles", "Categories"].map((text) => (
            <Link
              key={text}
              href={`/dashboard/${text.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-[#0c151d] text-sm font-medium"
            >
              {text}
            </Link>
          ))}

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-500 mt-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
