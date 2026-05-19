import Link from "next/link";
import { Book } from "@/types/book";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <Link href={`/books/${book.id}`}>
      <div className="flex h-full cursor-pointer flex-col justify-between rounded-2xl bg-white p-6 shadow transition-shadow hover:shadow-md">
        <div>
          <div className="mb-2 flex items-start justify-between">
            <h2 className="line-clamp-2 flex-1 text-base font-bold text-gray-800">
              {book.title}
            </h2>
            <span
              className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                book.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {book.available ? "가능" : "대출중"}
            </span>
          </div>
          <p className="text-sm text-gray-500">{book.author}</p>
        </div>
        <p className="mt-4 text-right text-sm font-semibold text-blue-600">
          {book.price?.toLocaleString()}원
        </p>
      </div>
    </Link>
  );
}
