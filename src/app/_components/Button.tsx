"use client";

import Link from "next/link";

interface Props extends React.PropsWithChildren {
  href?: string;
  variant?: keyof typeof buttonStyleByVariant;
  size?: keyof typeof buttonStyleBySize;
  disabled?: boolean;
  onClick?: () => void;
}

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

export default function Button({
  href,
  variant = "default",
  size = "medium",
  disabled = false,
  onClick,
  children,
}: Props) {
  if (href) {
    return (
      <Link
        className={`${buttonStyleBySize[size]} ${disabled ? "cursor-default bg-gray-600 text-white" : buttonStyleByVariant[variant]} inline-flex w-full items-center justify-center rounded-lg font-semibold`}
        href={disabled ? "/" : href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${buttonStyleBySize[size]} ${buttonStyleByVariant[variant]} w-full rounded-lg font-semibold`}
      disabled={disabled}
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
}
