"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookRequest } from "@/types/book";

export default function BookForm() {
  const router = useRouter();
  const [form, setForm] = useState<BookRequest>({
    title: "",
    author: "",
    price: 0,
    available: true,
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        throw new Error("등록 실패");
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("등록 중 오류가 발생했습니다. 서버를 확인하세요.");
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
          placeholder="도서 제목을 입력하세요"
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
          placeholder="저자명을 입력하세요"
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
          value={form.price}
          onChange={handleChange}
          min={0}
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

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "등록 중..." : "도서 등록"}
      </button>
    </div>
  );
}
