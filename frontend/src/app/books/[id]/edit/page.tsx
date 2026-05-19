import { notFound } from "next/navigation";
import EditForm from "./EditForm";
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

export default async function EditBookPage({
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
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">도서 수정</h1>
      <EditForm book={book} />
    </div>
  );
}
