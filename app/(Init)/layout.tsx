import Header from "../../components/Header";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Poiret_One } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <Header />
      {children}
      <Footer />
    </body>
  );
}
