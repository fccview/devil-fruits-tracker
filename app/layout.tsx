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
  title: "One Piece Devil Fruits - by chapter/episode",
  description:
    "Explore Devil Fruits from One Piece manga and anime. Search by chapter, episode, or name up to where you are in the series avoiding spoilers.",
  metadataBase: new URL("https://fruitsbychapter.vercel.app"),
  openGraph: {
    title: "One Piece Devil Fruits Database",
    description:
      "Explore Devil Fruits from One Piece manga and anime. Search by chapter, episode, or name up to where you are in the series avoiding spoilers.",
    url: "https://fruitsbychapter.vercel.app",
    siteName: "One Piece Devil Fruits",
    images: [
      {
        url: "/gomugomu-metadata.jpg",
        alt: "One Piece Devil Fruits Database",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[#1a1a2e] relative">
          <div className="fixed inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
          <div
            className="fixed inset-0 bg-[url('/one-piece-bg.png')] bg-cover bg-center opacity-35 pointer-events-none"
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
