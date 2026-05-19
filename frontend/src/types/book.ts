export interface Book {
  id: number;
  title: string;
  author: string;
  price: number | null;
  available: boolean;
}

export interface BookRequest {
  title: string;
  author: string;
  price: number;
  available: boolean;
}
