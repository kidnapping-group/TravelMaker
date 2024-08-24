import Image from "next/image";

interface NavigationButtonProp {
  disabled: boolean;
  onClick: () => void;
}

function PrevButton({ disabled, onClick }: NavigationButtonProp) {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 disabled:pointer-events-none tablet:h-10 tablet:w-10"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        className="select-none"
        src={`/icons/icon-arrow-prev-${disabled ? "passive-" : ""}pagination.svg`}
        width={18}
        height={18}
        alt="이전"
        draggable={false}
      />
    </button>
  );
}

function NextButton({ disabled, onClick }: NavigationButtonProp) {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 disabled:pointer-events-none tablet:h-10 tablet:w-10"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <Image
        src={`/icons/icon-arrow-next-${disabled ? "passive-" : ""}pagination.svg`}
        width={18}
        height={18}
        alt="다음"
      />
    </button>
  );
}

interface PageButtonProps extends React.PropsWithChildren {
  isActive: boolean;
  onClick: () => void;
}

function PageButton({ isActive, onClick, children }: PageButtonProps) {
  return (
    <button
      className={`${
        isActive ? "bg-primary-500 text-white" : "bg-white text-black hover:bg-gray-100"
      } flex h-8 w-8 items-center justify-center rounded-full text-md font-medium disabled:pointer-events-none tablet:h-10 tablet:w-10 tablet:text-lg`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { PrevButton, NextButton, PageButton };
