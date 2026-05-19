import Link from "next/link";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/book";

async function getBooks(keyword?: string): Promise<Book[]> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  const url = keyword
    ? `${base}/api/books?keyword=${encodeURIComponent(keyword)}`
    : `${base}/api/books`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("도서 목록을 불러오지 못했습니다.");
  }
  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const params = await searchParams;
  const keyword = params.keyword ?? "";
  const books = await getBooks(keyword);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">전체 도서</h1>
        <span className="text-sm text-gray-500">{books.length}권</span>
      </div>

      <form method="GET" className="mb-8 flex gap-2">
        <input
          name="keyword"
          defaultValue={keyword}
          placeholder="제목 또는 저자 검색..."
          className="flex-1 rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          검색
        </button>
        {keyword && (
          <Link
            href="/"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            초기화
          </Link>
        )}
      </form>

      {books.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="mb-3 text-4xl">📭</p>
          <p>등록된 도서가 없습니다.</p>
          <Link
            href="/register"
            className="mt-4 inline-block text-sm text-blue-600 underline"
          >
            첫 도서 등록하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
