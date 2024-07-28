import HairModal from "@/app/test/_components/HairModal";
import { openModal } from "@/components/Modal";

export default function Page() {
  return (
    <div>
      <h1>페이지 제목</h1>
      <button type="button" onClick={openModal}>
        헤어 모달 열기
      </button>
      <HairModal />
    </div>
  );
}
