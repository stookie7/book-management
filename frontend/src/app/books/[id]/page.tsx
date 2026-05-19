import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";
import { Book } from "@/types/book";

async function getBook(id: string): Promise<Book | null> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  const res = await fetch(`${base}/api/books/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("도서 정보를 불러오지 못했습니다.");
  }
  return res.json();
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl bg-white p-8 shadow-md">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  book.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {book.available ? "대출 가능" : "대출 중"}
              </span>
            </div>
            <p className="text-lg text-gray-500">{book.author}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">도서 번호</p>
            <p className="font-semibold text-gray-700">#{book.id}</p>
          </div>
        </div>

        <div className="grid gap-4 rounded-xl bg-gray-50 p-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">가격</p>
            <p className="mt-1 text-xl font-semibold text-blue-600">
              {book.price?.toLocaleString() ?? 0}원
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">대출 상태</p>
            <p className="mt-1 font-semibold text-gray-700">
              {book.available ? "이용 가능" : "현재 대출 중"}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/books/${book.id}/edit`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            수정
          </Link>
          <DeleteButton id={book.id} />
          <Link
            href="/"
            className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
