import getInputColorStatus from "@/components/Input/getInputColorStatus";
import Image from "next/image";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.PropsWithChildren {
  register: UseFormRegisterReturn;
  type: "text" | "email" | "password" | "number";
  name: string;
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  touched: boolean | undefined;
}

export default function Input({
  register,
  type,
  name,
  label,
  placeholder,
  error,
  touched,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative flex flex-col gap-[10px]">
      <label htmlFor={name} className="text-[16px] font-normal leading-[26px] text-black">
        {label}
      </label>
      <input
        id={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        {...register}
        className={`h-[58px] w-full rounded-md bg-gray-200 py-[10px] pl-[10px] outline-none ${type === "password" ? "pr-10" : "pr-[10px]"} ${getInputColorStatus(error, touched)}`}
      />
      {type === "password" && (
        <Image
          src={showPassword ? "/icons/icon-eye.svg" : "/icons/icon-eye-off.svg"}
          alt="toggle visibility"
          width={24}
          height={24}
          className="absolute right-[10px] top-[53px] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
      {error && <p className="text-red text-[12px] font-normal leading-[18px]">{error.message}</p>}
    </div>
  );
}
