export interface BookModel {
  id: number;
  title: string,
  author: string,
  description: string,
  genre?: number,
  pages?: number,
  date?: string
}
