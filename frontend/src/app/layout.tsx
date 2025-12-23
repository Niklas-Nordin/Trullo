import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import {getAuthStatus} from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trullo",
  description: "This is an app where you can manage your projects and tasks.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const auth =  await getAuthStatus();
  const isLoggedIn = auth.isLoggedIn;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased layout`}
      >
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
