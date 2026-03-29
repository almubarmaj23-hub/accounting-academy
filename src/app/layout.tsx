import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "أكاديمية المحاسبة - تعلم المحاسبة المالية من الصفر إلى الاحتراف",
  description: "منصة تعليمية عربية متخصصة في تعليم المحاسبة المالية. تعلم أساسيات المحاسبة، القوائم المالية، المعايير الدولية، والتحليل المالي بطريقة تفاعلية وعملية.",
  keywords: ["محاسبة", "محاسبة مالية", "تعلم المحاسبة", "القوائم المالية", "المعايير المحاسبية", "IFRS", "التحليل المالي"],
  authors: [{ name: "أكاديمية المحاسبة" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "أكاديمية المحاسبة - تعلم المحاسبة المالية",
    description: "منصة تعليمية عربية متخصصة في تعليم المحاسبة المالية من الصفر إلى الاحتراف",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
