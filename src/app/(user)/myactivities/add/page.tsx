"use client";

import activitiesAPI from "@/apis/activitiesAPI";
import AddInput from "@/app/(user)/myactivities/add/_components/AddInput";
import AddressInput from "@/app/(user)/myactivities/add/_components/AddressInput";
import ImageInput from "@/app/(user)/myactivities/add/_components/ImageInput";
import SubImagesInput from "@/app/(user)/myactivities/add/_components/SubImagesInput";
import { Button } from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { setHours, setMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Add() {
  const dropdownList = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(dropdownList[0]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState<{
    date: Date;
    startTime: Date | null;
    endTime: Date | null;
  }>({
    date: new Date(),
    startTime: null,
    endTime: null,
  });
  const [schedules, setSchedules] = useState<{ date: Date; startTime: string; endTime: string }[]>(
    [],
  );
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);

  const router = useRouter();

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleScheduleChange = (field: string, value: Date | null) => {
    setCurrentSchedule(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSchedule = () => {
    const isDuplicate = schedules.some(
      schedule =>
        schedule.date.toISOString().split("T")[0] ===
          currentSchedule.date.toISOString().split("T")[0] &&
        schedule.startTime === currentSchedule.startTime?.toLocaleTimeString() &&
        schedule.endTime === currentSchedule.endTime?.toLocaleTimeString(),
    );

    if (isDuplicate) {
      // alert("중복된 스케줄이 존재합니다.");
      return;
    }

    setSchedules([
      ...schedules,
      {
        date: currentSchedule.date,
        startTime:
          currentSchedule.startTime?.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }) || "",
        endTime:
          currentSchedule.endTime?.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }) || "",
      },
    ]);
    setCurrentSchedule({ date: new Date(), startTime: null, endTime: null });
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const now = new Date();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      title,
      category: selectedCategory,
      description,
      address,
      price: parseFloat(price),
      schedules: schedules.map(schedule => ({
        date: schedule.date.toISOString().split("T")[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
      bannerImageUrl,
      subImageUrls,
    };
    try {
      const res = await activitiesAPI.post(formData);
      openPopup("success");

      // eslint-disable-next-line no-console
      console.log("Response:", res);
    } catch (error) {
      openPopup("fail");
    }
  };

  const isSubmitDisabled: boolean =
    !title ||
    !description ||
    !price ||
    !address ||
    !schedules ||
    !bannerImageUrl ||
    !subImageUrls ||
    !selectedCategory;

  return (
    <div>
      <form onSubmit={handleSubmit} className="px-3">
        <div className="flex justify-between">
          <p className="text-3xl font-bold">내 체험 등록</p>
          <Button disabled={isSubmitDisabled} type="submit">
            등록
          </Button>
        </div>

        <AddInput
          id="title"
          label="체험명"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="체험명을 입력해 주세요"
        />
        <p className="text-xl font-bold">카테고리</p>
        <div className="mb-8 mt-2.5">
          <Dropdown
            menuItems={dropdownList}
            type="square"
            onChangeDropdown={handleCategory}
            placeHolder="카테고리"
          />
        </div>

        <AddInput
          id="description"
          label="체험 소개"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="체험 소개를 입력해 주세요"
          isTextArea
        />
        <AddInput
          id="price"
          label="판매 가격"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="판매 가격을 입력해 주세요"
          type="number"
        />
        <AddressInput address={address} setAddress={setAddress} />
        <div className="mb-2.5 text-xl font-bold">예약 가능한 시간대</div>
        <div className="grid grid-cols-8 grid-rows-2 gap-1">
          <p className="text-base col-span-3 font-medium">날짜</p>
          <p className="text-base col-span-2 font-medium">시작 시간</p>
          <p className="text-base col-span-2 font-medium">종료 시간</p>
          <p className="text-base col-span-1 font-medium">추가</p>
          <div className="col-span-3">
            <DatePicker
              showIcon
              className="h-9 w-full rounded-[4px] border border-gray-500"
              toggleCalendarOnIconClick
              selected={currentSchedule.date}
              onChange={(date: Date | null) => {
                handleScheduleChange("date", date);
              }}
              minDate={new Date()}
            />
          </div>
          <div className="col-span-2">
            <DatePicker
              className="h-9 w-full rounded-[4px] border border-gray-500"
              selected={currentSchedule.startTime}
              onChange={(date: Date | null) => handleScheduleChange("startTime", date)}
              selectsStart
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              minTime={
                currentSchedule.date.toDateString() === now.toDateString()
                  ? now
                  : setHours(setMinutes(new Date(), 0), 0)
              }
              maxTime={setHours(setMinutes(currentSchedule.date, 0), 23)}
            />
          </div>
          <div className="col-span-2">
            <DatePicker
              className="h-9 w-full rounded-[4px] border border-gray-500"
              selected={currentSchedule.endTime}
              onChange={(date: Date | null) => handleScheduleChange("endTime", date)}
              selectsEnd
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="h:mm aa"
              minTime={currentSchedule.startTime || setHours(setMinutes(new Date(), 0), 0)}
              maxTime={setHours(setMinutes(currentSchedule.date, 0), 23)}
            />
          </div>
          <Button
            className="text-base col-span-1 h-9 rounded-[4px] border border-gray-500 font-medium"
            type="button"
            onClick={addSchedule}
          >
            추가
          </Button>
        </div>

        <div className="mb-8 mt-4">
          <p className="text-base h-8 font-medium">추가한 예약 시간</p>
          <div className="grid grid-cols-8 gap-1">
            {schedules.map((schedule, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={index}>
                <div className="col-span-3 flex h-9 items-center rounded-[4px] border border-gray-500 bg-white pl-2">
                  {schedule.date.toISOString().split("T")[0]}
                </div>
                <div className="col-span-2 flex h-9 items-center rounded-[4px] border border-gray-500 bg-white pl-2">
                  {schedule.startTime}
                </div>
                <div className="col-span-2 flex h-9 items-center rounded-[4px] border border-gray-500 bg-white pl-2">
                  {schedule.endTime}
                </div>
                <Button
                  className="text-base col-span-1 h-9 rounded-[4px] border border-gray-500 font-medium"
                  type="button"
                  onClick={() => removeSchedule(index)}
                >
                  삭제
                </Button>
              </React.Fragment>
            ))}
          </div>
        </div>
        <p className="mb-2.5 text-xl font-bold">배너 이미지</p>
        <ImageInput bannerImageUrl={bannerImageUrl} setBannerImageUrl={setBannerImageUrl} />
        <p className="mb-2.5 text-xl font-bold">소개 이미지</p>
        <SubImagesInput subImageUrls={subImageUrls} setSubImageUrls={setSubImageUrls} />
      </form>
      <Popup
        id="success"
        text="체험등록이 완료되었습니다."
        leftButton="확인"
        onChangeLeftButton={() => {
          closePopup("success");
          router.push("/myactivities");
        }}
      />
      <Popup
        id="fail"
        text="체험등록에 실패했습니다."
        leftButton="확인"
        onChangeLeftButton={() => {
          closePopup("fail");
        }}
      />
    </div>
  );
}