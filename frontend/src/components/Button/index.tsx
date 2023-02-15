import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}
export function Button({ title }: ButtonProps) {
  return (
    <button className="flex w-full justify-center mt-6 rounded-md border-transparent bg-green-700 py-2 px-4 hover:bg-green-800 transition-colors duration-75">
      {title}
    </button>
  );
}
