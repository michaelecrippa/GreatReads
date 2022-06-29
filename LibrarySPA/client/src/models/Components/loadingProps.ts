import { ReactNode } from "react";

export interface LoadingProps<T> {
  error: any;
  loading: boolean;

  children: (() => ReactNode) | ReactNode;
}
