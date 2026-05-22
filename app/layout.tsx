import type { Metadata } from "next";
import "./globals.css";
import { Geist_Mono, Orbitron, Plus_Jakarta_Sans } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zalont — Design, AI & Engineering Studio",
  description:
    "Zalont is a student-led creative-tech studio blending design, AI, and engineering to deliver bold, modern, and intelligent visual solutions for startups, colleges, and businesses.",
  keywords: ["design studio", "UI/UX", "AI branding", "engineering", "creative agency"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
