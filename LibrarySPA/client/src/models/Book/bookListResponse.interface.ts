import { BookModel } from "./bookModel.interface";

export interface BookListResponse {
  results: BookModel[],
}