import type { Metadata } from "next";
import "./globals.css";
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Valentines: A Romantic Card Game with a Surprise Proposal",
  description:
    "Play a unique Valentine's card game. Complete the collection to reveal a romantic proposal!",
  keywords: [
    "Valentine's card game",
    "romantic proposal game",
    "photo card challenge",
    "Valentine's Day surprise",
    "couples game",
    "valentine's day game",
    "proposal game",
  ],
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
