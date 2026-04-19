import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatbotWidget } from "@/components/support/chatbot-widget";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

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
      <body className={`${manrope.variable} ${spaceGrotesk.variable} flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased`}>
        <SessionProvider>
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <ChatbotWidget />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
