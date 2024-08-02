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
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={name} className="text-[16px] font-normal leading-[26px] text-black">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`h-[58px] w-full rounded-[6px] bg-gray-200 py-[10px] pl-[10px] pr-[40px] outline-none ${getClassName()}`}
      />
      {error && <p className="text-[12px] font-normal leading-[18px] text-red">{error.message}</p>}
    </div>
  );
}
