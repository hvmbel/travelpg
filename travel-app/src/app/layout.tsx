import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { MobileShell } from "@/components/layout/MobileShell";
import { TabBar } from "@/components/layout/TabBar";

export const metadata: Metadata = {
  title: "Travel App",
  description: "Travel fintech prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <MobileShell>
          <Header />
          <main className="px-4 pt-2">{children}</main>
          <TabBar />
        </MobileShell>
      </body>
    </html>
  );
}
