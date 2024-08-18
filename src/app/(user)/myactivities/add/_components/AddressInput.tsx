"use client";

import { Button } from "@/components/Button";
import Modal, { closeModal, openModal } from "@/components/Modal";
import React from "react";
import DaumPostcode from "react-daum-postcode";

interface AddressInputProps {
  address: string;
  setAddress: (address: string) => void;
}

function AddressInput({ address, setAddress }: AddressInputProps) {
  const themeObj = {
    postcodeTextColor: "#FA7142",
    emphTextColor: "#333333",
  };

  const postCodeStyle = {
    width: "100%",
    height: "480px",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completeHandler = (data: any) => {
    setAddress(data.address);
  };

  const closeHandler = (state: string) => {
    if (state === "COMPLETE_CLOSE") {
      closeModal();
    }
  };

  return (
    <div>
      <div className="mb-2.5 text-xl font-bold">주소</div>
      <div className="mb-8 flex items-center">
        <input
          value={address}
          className="mr-3 h-14 w-full rounded-[4px] border border-gray-500 py-4 pl-4"
          placeholder="주소를 검색하세요."
        />

        <Button onClick={openModal} type="button" size="large">
          검색
        </Button>
      </div>

      <Modal title="주소 입력">
        <DaumPostcode
          theme={themeObj}
          style={postCodeStyle}
          onComplete={completeHandler}
          onClose={closeHandler}
        />
      </Modal>
    </div>
  );
}
export default AddressInput;
