import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "أكاديمية المحاسبة - تعلم المحاسبة المالية من الصفر إلى الاحتراف",
  description: "منصة تعليمية عربية متخصصة في تعليم المحاسبة المالية. تعلم أساسيات المحاسبة، القوائم المالية، المعايير الدولية، والتحليل المالي بطريقة تفاعلية وعملية.",
  keywords: ["محاسبة", "محاسبة مالية", "تعلم المحاسبة", "القوائم المالية", "IFRS", "التحليل المالي", "المدقق المالي"],
  authors: [{ name: "أكاديمية المحاسبة" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "أكاديمية المحاسبة - تعلم المحاسبة المالية من الصفر إلى الاحتراف",
    description: "منصة تعليمية عربية متخصصة في تعليم المحاسبة المالية",
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
        className={`${cairo.variable} font-[family-name:var(--font-cairo)] antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
