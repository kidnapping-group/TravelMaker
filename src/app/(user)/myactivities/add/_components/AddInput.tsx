import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface AddInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  type?: string;
}
function AddInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
  isTextArea,
  type = "text",
}: AddInputProps) {
  return (
    <div>
      <div>
        {label && (
          <label className="text-xl font-bold" htmlFor={id}>
            {label}
          </label>
        )}
      </div>

      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-8 mt-2.5 h-28 w-full resize-none rounded-[4px] bg-gray-100 p-4 outline-blue-500 focus:outline focus:outline-1"
        />
      ) : (
        <input
          id={id}
          value={value}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          className="mb-8 mt-2.5 h-14 w-full rounded-[4px] bg-gray-100 p-4 outline-blue-500 focus:outline focus:outline-1"
        />
      )}
    </div>
  );
}

export default AddInput;
