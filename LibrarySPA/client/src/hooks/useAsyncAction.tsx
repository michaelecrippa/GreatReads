import { useEffect, useState, useCallback, useRef } from 'react';

export interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: any;
}

export function useAsyncAction<T>(action: () => Promise<T>, dependencies: any[]) {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const perform = useCallback(() => {
    setState({ data: undefined, loading: true, error: undefined });

    (async function () {
      try {
        const data = await action();

        setState({
          data,
          loading: false,
          error: undefined,
        });
      } catch (error) {
        setState({
          data: undefined,
          loading: false,
          error,
        });
        console.log(error);
      }
    })();
  }, dependencies);

  return { ...state, perform };
}
