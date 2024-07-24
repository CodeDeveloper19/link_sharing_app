import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Link Sharing App by Okoli Akachukwu",
};

const instrument_sans = Instrument_Sans({ 
  weight: ["400", "600", "700"],
  subsets: ["latin"] 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#FAFAFA] ${instrument_sans.className}`}>
        {children}
      </body>
    </html>
  );
}
