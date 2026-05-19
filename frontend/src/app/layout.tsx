import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "도서 관리 시스템",
  description: "Spring Boot + Next.js 도서 관리",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white shadow-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              📚 도서 관리 시스템
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="rounded bg-white px-3 py-1 text-blue-500 transition-colors hover:text-blue-200">
                목록
              </Link>
              <Link
                href="/register"
                className="rounded bg-white px-3 py-1 text-blue-700 transition-colors hover:bg-blue-100">
                + 등록
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mt-125 border-t bg-white py-6 text-center text-sm text-gray-400">
          © 2025 도서 관리 시스템 · Spring Boot + Next.js
        </footer>
      </body>
    </html>
  );
}
