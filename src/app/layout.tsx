import type { Metadata } from "next";
import "./globals.css";
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Bad Bunny for Super Bowl 60 Halftime Show! Latinos go crazy",

  description:
    "Everything you need to know about Bad Bunny#s legendary headline of Super Bowl 60 halftime show.",

  keywords: [
    "Bad Bunny Super Bowl 60",
    "Super Bowl 60 halftime show",
    "Bad Bunny halftime rumors",
    "NFL halftime preview",
    "Super Bowl halftime interactive",
    "Bad Bunny fan challenge",
    "Super Bowl 60 predictions",
    "halftime show leak",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preload" href="/food/bbq.avif" as="image" />
        <link rel="preload" href="/food/billard.avif" as="image" />
        <link rel="preload" href="/food/BubbleTea.avif" as="image" />
        <link rel="preload" href="/food/Burger.avif" as="image" />
        <link rel="preload" href="/food/cheesecake.webp" as="image" />
        <link rel="preload" href="/food/club.avif" as="image" />
        <link rel="preload" href="/food/cuddle.avif" as="image" />
        <link rel="preload" href="/food/hotpot.avif" as="image" />
        <link rel="preload" href="/food/IceCream.avif" as="image" />
        <link rel="preload" href="/food/lasagna.avif" as="image" />
        <link rel="preload" href="/food/MatchaCake.avif" as="image" />
        <link rel="preload" href="/food/movie.avif" as="image" />
        <link rel="preload" href="/food/pannacotta.webp" as="image" />
        <link rel="preload" href="/food/pizza.avif" as="image" />
        <link rel="preload" href="/food/sexy.avif" as="image" />
        <link rel="preload" href="/food/snacks.avif" as="image" />
        <link rel="preload" href="/food/thai.avif" as="image" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
