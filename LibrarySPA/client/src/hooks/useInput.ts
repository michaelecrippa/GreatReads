import { ChangeEvent, useState } from "react";

export function useFormInput<T extends {}>(initialvalues: T) {
  const [input, setInput] = useState(initialvalues);

  return {
    input,
    onChange: (key: keyof T) =>
      (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput({
          ...input,
          [key]: event.target.value
        });
      },

    hasError: (key: keyof T, error: any) => error?.body?.key === key,
    errorMessageFor: (key: keyof T, error: any): string | undefined => {
      if (error?.body?.key === key) {
        return error.body.message;
      }

      return undefined;
    },
    globalErrorMessage: (error: any) => {
      const supportedKeys = Object.keys(input);

      if (error?.body?.key && !supportedKeys.includes(error.body.key)) {
        return error.body.message as string;
      }

      return undefined;
    }
  };
}