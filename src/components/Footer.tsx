import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-slate-50">
      <div className="flex max-w-[960px] flex-1 flex-col w-full">
        <div className="flex flex-col gap-6 px-5 py-10 text-center sm:text-left">
          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-around sm:gap-6">
            {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map(
              (text) => (
                <a
                  key={text}
                  className="text-[#4574a1] text-base font-normal leading-normal"
                  href="#"
                >
                  {text}
                </a>
              )
            )}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <Facebook color="#3b5998" />
            <Twitter color="#1da1f2" />
            <Instagram color="#e4405f" />
          </div>

          {/* Copyright */}
          <div className="text-[#4574a1] text-base font-normal leading-normal text-center ">
            © 2025. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
