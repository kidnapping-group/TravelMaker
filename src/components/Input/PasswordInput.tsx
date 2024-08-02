import Image from "next/image";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import OffEye from "../../../public/icons/icon-eye-off.svg";
import Eye from "../../../public/icons/icon-eye.svg";

interface PasswordInputProps extends React.PropsWithChildren {
  register: UseFormRegisterReturn;
  name: string;
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  touched: boolean | undefined;
}

export default function PasswordInput({
  register,
  name,
  label,
  placeholder,
  error,
  touched,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const getClassName = () => {
    if (error) {
      return "border border-red";
    }
    if (touched) {
      return "border border-blue";
    }
    return "";
  };

  return (
    <div className="relative flex flex-col gap-[10px]">
      <label htmlFor={name} className="text-[16px] font-normal leading-[26px] text-black">
        {label}
      </label>
      <input
        id={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...register}
        className={`h-[58px] w-full rounded-[6px] bg-gray-200 py-[10px] pl-[10px] pr-[40px] outline-none ${getClassName()}`}
      />
      <Image
        src={showPassword ? Eye : OffEye}
        alt="toggle visibility"
        className="absolute right-[10px] top-[53px] cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      />
      {error && <p className="text-[12px] font-normal leading-[18px] text-red">{error.message}</p>}
    </div>
  );
}
