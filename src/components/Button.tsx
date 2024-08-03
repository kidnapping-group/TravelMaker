"use client";

import Link, { LinkProps } from "next/link";

const buttonStyleByVariant = {
  default: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
  outline:
    "border border-primary-500 bg-white text-primary-500 hover:bg-gray-100 active:bg-gray-200",
};

const buttonStyleBySize = {
  wide: "h-[56px] text-base",
  large: "h-[56px] max-w-[136px] text-base",
  medium: "h-[48px] max-w-[120px] text-base",
  small: "h-[38px] max-w-20 text-sm",
};

interface ButtonProps extends React.PropsWithChildren {
  variant?: keyof typeof buttonStyleByVariant;
  size?: keyof typeof buttonStyleBySize;
}

export function Button({
  variant = "default",
  size = "medium",
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${buttonStyleBySize[size]} ${buttonStyleByVariant[variant]} w-full rounded-lg font-semibold transition disabled:border-none disabled:bg-gray-400 disabled:text-white`}
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "default",
  size = "medium",
  children,
  ...props
}: ButtonProps & LinkProps) {
  return (
    <Link
      className={`${buttonStyleBySize[size]} ${buttonStyleByVariant[variant]} inline-flex w-full items-center justify-center rounded-lg font-semibold transition`}
      {...props}
    >
      {children}
    </Link>
  );
}
