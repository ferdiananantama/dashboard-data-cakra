"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import backgroundImg from "../../../public/assets/bg.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid relative overflow-hidden">
          <Image
            src={backgroundImg}
            alt="background"
            className="object-cover w-full h-full absolute"
          />

          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

          <motion.div
            className="z-20 px-10 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4 uppercase">
              Welcome to <span className="text-blue">My Dashboard</span>
            </h2>
            <p className="text-lg max-w-md mx-auto text-white/80">
              Stay informed with the latest and most reliable articles, daily.
            </p>
          </motion.div>

          <motion.div
            className="absolute top-10 right-10 w-10 h-10 bg-orange-600 rounded-full z-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
