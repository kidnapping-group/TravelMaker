import getInputClassName from "@/utils/getInputClassName";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps extends React.PropsWithChildren {
  register: UseFormRegisterReturn;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  touched: boolean | undefined;
}

export default function TextArea({ register, name, placeholder, error, touched }: TextAreaProps) {
  return (
    <div className="flex-col gap-[10px]">
      <textarea
        {...register}
        id={name}
        placeholder={placeholder}
        className={`h-[200px] w-full rounded-[6px] bg-gray-200 py-[10px] pl-[20px] pr-[40px] outline-none ${getInputClassName(error, touched)}`}
      />
      {error && <p className="text-[12px] font-normal leading-[18px] text-red">{error.message}</p>}
    </div>
  );
}
