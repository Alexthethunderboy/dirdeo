import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import { getCmsData } from "@/lib/cms";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsData();
  const logoUrl = cms.settings.logoUrl || "/favicon.ico";
  
  return {
    title: `${cms.settings.siteName} | Premium Videography & Photography`,
    description: "A minimalist portfolio for high-end videography and photography projects.",
    icons: {
      icon: [
        { url: logoUrl, sizes: "any" },
        { url: logoUrl, type: "image/png" }
      ],
      apple: logoUrl,
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cms = await getCmsData();

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <SmoothScroll>
          <Header settings={cms.settings} />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
