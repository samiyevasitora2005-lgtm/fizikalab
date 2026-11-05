import type { Metadata, Viewport } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FizikaLab: fizikani tajriba orqali o‘rganing",
    template: "%s | FizikaLab",
  },
  description:
    "7–11-sinf o‘quvchilari uchun darsliklar, videodarslar, virtual laboratoriyalar, o‘yinlar va topshiriqlar jamlangan zamonaviy fizika platformasi.",
  openGraph: {
    title: "FizikaLab: fizikani tajriba orqali o‘rganing",
    description:
      "Darsliklar, videodarslar, interaktiv laboratoriyalar va fizik o‘yinlar bir joyda.",
    locale: "uz_UZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1030",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${nunito.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
