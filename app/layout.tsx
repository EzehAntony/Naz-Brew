import Header from "@/components/Header";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata, Viewport } from "next";
import { Poiret_One } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import Hydration from "../components/Hydration";

const poiret = Poiret_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NazBrew",
  description: "Get a cup of coffee!",
};

export const viewport: Viewport = {
  themeColor: "black",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poiret.className}>
        <Hydration>{children}</Hydration>
      </body>
    </html>
  );
}
