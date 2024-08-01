"use client";

import Link, { LinkProps } from "next/link";

const buttonStyleByVariant = {
  default: "bg-green text-white disabled:bg-gray-600",
  outline:
    "border border-green bg-white text-green disabled:border-none disabled:bg-gray-600 disabled:text-white",
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
      className={`${buttonStyleBySize[size]} ${buttonStyleByVariant[variant]} w-full rounded-lg font-semibold`}
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
      className={`${buttonStyleBySize[size]} ${buttonStyleByVariant[variant]} inline-flex w-full items-center justify-center rounded-lg font-semibold`}
      {...props}
    >
      {children}
    </Link>
  );
}
