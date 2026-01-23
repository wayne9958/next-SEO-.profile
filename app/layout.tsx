import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // 關鍵：加入你的正式網域
  metadataBase: new URL("https://wei9958-portfolio.vercel.app/"),

  title: "Wei's Portfolio",
  description: "前端開發工程師作品集",
  openGraph: {
    images: "/next.svg", // 現在 Next.js 會自動把它補完為完整網址
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
