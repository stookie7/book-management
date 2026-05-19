import BookForm from "@/components/BookForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">도서 등록</h1>
      <BookForm />
    </div>
  );
}
