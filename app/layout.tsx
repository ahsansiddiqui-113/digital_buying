import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DigitalMarket - Premium Digital Products Marketplace",
  description: "Access premium digital assets, templates, and courses from world-class creators. Instant delivery, lifetime access.",
  keywords: ["digital products", "templates", "courses", "assets", "marketplace"],
  openGraph: {
    title: "DigitalMarket - Premium Digital Products",
    description: "Access premium digital assets and courses with instant delivery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white antialiased">
        <SessionProvider>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
