import Modal from "@/components/Modal";

function ReservationStatusModal() {
  return (
    <Modal title="예약 정보">
      <div className="flex flex-col">
        <div className="flex">
          <p>신청</p>
          <p>승인</p>
          <p>거절</p>
        </div>
        <h2>예약 날짜</h2>
        <p>2023년 어쩌구저쩌구</p>
      </div>
    </Modal>
  );
}

export default ReservationStatusModal;
