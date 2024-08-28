import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";

function formatNumber(num: string): string {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 천단위 , 표시
}
interface NumberInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
function NumberInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
  ...props
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState(formatNumber(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ""); // 숫자 외 입력 방지
    const formattedValue = formatNumber(inputValue);
    setDisplayValue(formattedValue);
    onChange(inputValue);
  };

  return (
    <div>
      <div>
        {label && (
          <label className="text-xl font-bold" htmlFor={id}>
            {label}
          </label>
        )}
      </div>

      <input
        id={id}
        value={displayValue}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        type="text"
        onChange={handleChange}
        onBlur={onBlur}
        className="appearance:textfield] mb-8 mt-2.5 h-14 w-full rounded-[4px] bg-gray-100 p-4 outline-blue-500 focus:outline focus:outline-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />
    </div>
  );
}

export default NumberInput;
