"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book, BookRequest } from "@/types/book";

export default function EditForm({ book }: { book: Book }) {
  const router = useRouter();
  const [form, setForm] = useState<BookRequest>({
    title: book.title,
    author: book.author,
    price: book.price ?? 0,
    available: book.available,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? Number(value)
          : name === "available"
            ? value === "true"
            : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.author.trim()) {
      setError("제목과 저자는 필수 항목입니다.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
      const res = await fetch(`${base}/api/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("수정 실패");
      }

      router.push(`/books/${book.id}`);
      router.refresh();
    } catch {
      setError("수정 중 오류가 발생했습니다. 백엔드 서버를 확인하세요.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl bg-white p-8 shadow-md">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          저자 <span className="text-red-500">*</span>
        </label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          가격 (원)
        </label>
        <input
          name="price"
          type="number"
          min={0}
          value={form.price}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          대출 가능 여부
        </label>
        <select
          name="available"
          value={String(form.available)}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="true">대출 가능</option>
          <option value="false">대출 중</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "수정 중..." : "저장"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          취소
        </button>
      </div>
    </div>
  );
}
