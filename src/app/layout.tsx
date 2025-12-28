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

export const metadata: Metadata = {
  title: "Medio Ambiente Chile | NewCooltura Informada",
  description: "Oficinas SEREMI, reciclaje, calculadora huella de carbono, parques nacionales y normativa ambiental en Chile",
  keywords: ["medio ambiente Chile", "reciclaje", "huella carbono", "parques nacionales", "SEREMI ambiente"],
  openGraph: {
    title: "Medio Ambiente Chile - NewCooltura Informada",
    description: "Reciclaje, parques y normativa ambiental",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
