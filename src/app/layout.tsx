import CategoryProvider from "@/context/CategoryProvider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Dashboard",
  description:
    "A dynamic and customizable dashboard application built with Next.js, React, and Tailwind CSS. This project allows users to manage and view different widgets organized into categories, fulfilling the requirements of a frontend developer assignment.",
  icons: [{ rel: "icon", url: "/dashboard.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <CategoryProvider>{children}</CategoryProvider>
      </body>
    </html>
  );
}
