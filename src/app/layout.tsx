import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Vazirmatn } from "next/font/google";
import { Inter, Space_Grotesk } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مهدی احمدی | مهندسی مکانیک، هوش مصنوعی و دیجیتال توئین",
  description: "وب‌سایت شخصی مهدی احمدی - دانشجوی مهندسی مکانیک با تمرکز بر هوش مصنوعی، یادگیری ماشین و فناوری دیجیتال توئین",
  keywords: ["مهندسی مکانیک", "هوش مصنوعی", "دیجیتال توئین", "یادگیری ماشین", "IoT", "پایتون"],
  authors: [{ name: "Mehdi Ahmadi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className={`${vazirmatn.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}