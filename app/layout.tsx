import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FizikaLab: fizikani o‘ynab o‘rganing",
    template: "%s | FizikaLab",
  },
  description:
    "7–11-sinf o‘quvchilari uchun elektron darsliklar, videodarslar, virtual laboratoriyalar va fizika o‘yinlari.",
};

export const viewport: Viewport = {
  themeColor: "#eaf6ff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
