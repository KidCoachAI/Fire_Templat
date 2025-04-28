import type {Metadata} from 'next';
import {Nunito, Open_Sans, Comic_Neue} from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '500'],
  display: 'swap',
});

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  variable: '--font-comic-neue',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KidCoach Visual Identity System',
  description: 'A fun and educational app for kids.',
  icons: '/icon.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${openSans.variable} ${comicNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}


