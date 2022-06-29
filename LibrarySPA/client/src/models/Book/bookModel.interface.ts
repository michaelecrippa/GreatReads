export interface BookModel {
  id: number;
  title: string,
  author: string,
  description: string,
  genre?: string,
  pages?: number,
  date?: string
}
