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
  title: 'One Piece Devil Fruits - by chapter/episode',
  description: 'Explore Devil Fruits from One Piece manga and anime. Search by chapter, episode, or name up to where you are in the series avoiding spoilers.',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'One Piece Devil Fruits Database',
    description: 'Explore Devil Fruits from One Piece manga and anime. Search by chapter, episode, or name up to where you are in the series avoiding spoilers.',
    url: 'https://your-domain.com',
    siteName: 'One Piece Devil Fruits',
    images: [
      {
        url: '/gomugomu-metadata.jpg',
        alt: 'One Piece Devil Fruits Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
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
