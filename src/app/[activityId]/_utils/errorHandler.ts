export interface PopupProps {
  text: string;
  onCloseButton: string;
  onChangeButton?: string;
}

const errorHandlers: Record<number, () => PopupProps> = {
  401: () => ({
    text: "로그인이 필요합니다.",
    onCloseButton: "닫기",
    onChangeButton: "로그인",
  }),
  403: () => ({
    text: "본인의 체험만 삭제할 수 있습니다.",
    onCloseButton: "확인",
  }),
};

export default errorHandlers;
