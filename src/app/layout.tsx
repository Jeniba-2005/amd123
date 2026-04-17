import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "ShopSphere X 🔥 | Power Your Shopping Experience",
  description: "High-end, futuristic AMD-inspired Retail & E-Commerce Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Providers>
          <Navbar />
          <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
