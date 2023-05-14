import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./footer";
import Analytics from "./analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fran y Gaby en Viaje",
  icons: {
    icon: "/favicon.jpg"
  },
  description:
    "¡Somos Fran y Gaby y nos encanta viajar! En este blog te compartimos nuestras aventuras, consejos de viaje y trámites útiles."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        {children}
      </body>
      <Footer />
    </html>
  );
}
