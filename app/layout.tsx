import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from './Footer';

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Fran y Gaby en Viaje",
  icons: {
    icon: "/favicon.jpg"
  },
  description:
    "¡Somos Gaby y Fran y nos encanta viajar! En este blog te compartimos nuestras aventuras, consejos de viaje y trámites útiles."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Footer />
    </html>
  );
}
