"use client";

import { postActivities } from "@/apis/API.type";
import activitiesAPI from "@/apis/activitiesAPI";
import { Button } from "@/components/Button";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setHours, setMinutes, setSeconds } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AddInput from "./AddInput";
import AddressAutoComplete from "./AddressAutoComplete";
import CategoryDropdown from "./CategoryDropdown";
import ImageInput from "./ImageInput";
import NumberInput from "./NumberInput";
import SubImagesInput from "./SubImagesInput";

export default function Add() {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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
  const queryClient = useQueryClient();

  const addActivityMutation = useMutation({
    mutationFn: (formData: postActivities) => activitiesAPI.post(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      openPopup("success");
    },
    onError: () => {
      openPopup("fail");
    },
  });

  const handleScheduleChange = (field: string, value: Date | null) => {
    setCurrentSchedule(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSchedule = () => {
    if (!currentSchedule.startTime || !currentSchedule.endTime) {
      openPopup("timeMissing");
      return;
    }
    const isDuplicate = schedules.some(
      schedule =>
        schedule.date.toISOString().split("T")[0] ===
          currentSchedule.date.toISOString().split("T")[0] &&
        schedule.startTime ===
          currentSchedule.startTime?.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Seoul",
          }) &&
        schedule.endTime ===
          currentSchedule.endTime?.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Seoul",
          }),
    );

    if (isDuplicate) {
      openPopup("duplicate");

      return;
    }

    setSchedules([
      ...schedules,
      {
        date: currentSchedule.date,
        startTime:
          currentSchedule.startTime?.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Seoul",
          }) || "",
        endTime:
          currentSchedule.endTime?.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Seoul",
          }) || "",
      },
    ]);
    setCurrentSchedule({ date: new Date(), startTime: null, endTime: null });
  };

  const removeSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const now = new Date();

  const onchange = (newValue: string) => {
    setPrice(newValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: postActivities = {
      title,
      category: selectedCategory,
      description,
      address,
      price: parseInt(price, 10),
      schedules: schedules.map(schedule => ({
        date: schedule.date.toISOString().split("T")[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
      bannerImageUrl,
      subImageUrls,
    };
    addActivityMutation.mutate(formData);
  };
  const isSubmitDisabled: boolean =
    !title ||
    !description ||
    !price ||
    !address ||
    !schedules ||
    !bannerImageUrl ||
    !subImageUrls.length ||
    !selectedCategory;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex items-start justify-between">
          <p className="text-2xl font-bold">내 체험 등록</p>
          <Button size="medium" disabled={isSubmitDisabled} type="submit">
            등록
          </Button>
        </div>
        <div className="h-full overflow-y-auto px-1">
          <AddInput
            id="title"
            label="체험명"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="체험명을 입력해 주세요"
          />
          <p className="text-xl font-bold">카테고리</p>
          <div className="mb-8 mt-2.5">
            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
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
          <NumberInput
            id="price"
            label="체험 비용"
            value={price}
            onChange={onchange}
            placeholder="인당 체험 비용을 입력해 주세요"
          />
          <AddressAutoComplete address={address} setAddress={setAddress} />

          <div className="mb-2.5 text-xl font-bold">예약 가능한 시간대</div>
          <div className="grid grid-cols-8 grid-rows-2 gap-1">
            <p className="text-base col-span-2 font-medium">날짜</p>
            <p className="text-base col-span-2 font-medium">시작 시간</p>
            <p className="text-base col-span-2 font-medium">종료 시간</p>
            <p className="text-base col-span-2 font-medium">추가</p>
            <div className="col-span-2 w-full">
              <DatePicker
                className="h-9 w-full rounded-[4px] bg-gray-100 pl-2 outline-blue-500 focus:outline focus:outline-1"
                toggleCalendarOnIconClick
                selected={currentSchedule.date}
                onChange={(date: Date | null) => {
                  handleScheduleChange("date", date);
                }}
                minDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="col-span-2">
              <DatePicker
                className="col-span-2 h-9 w-full rounded-[4px] bg-gray-100 pl-2 outline-blue-500 focus:outline focus:outline-1"
                selected={currentSchedule.startTime}
                onChange={(date: Date | null) => handleScheduleChange("startTime", date)}
                selectsStart
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
                minTime={
                  currentSchedule.date.toDateString() === now.toDateString()
                    ? now
                    : setHours(setMinutes(setSeconds(new Date(), 0), 0), 0)
                }
                maxTime={
                  currentSchedule.endTime || setHours(setMinutes(currentSchedule.date, 0), 23)
                }
              />
            </div>
            <div className="col-span-2 w-full">
              <DatePicker
                className="h-9 w-full rounded-[4px] bg-gray-100 pl-2 outline-blue-500 focus:outline focus:outline-1"
                selected={currentSchedule.endTime}
                onChange={(date: Date | null) => handleScheduleChange("endTime", date)}
                selectsEnd
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="HH:mm"
                minTime={currentSchedule.startTime || now}
                maxTime={setHours(setMinutes(currentSchedule.date, 0), 23)}
              />
            </div>
            <Button
              className="text-base col-span-2 h-9 rounded-[4px] bg-primary-500 font-medium text-white hover:bg-primary-600 active:bg-primary-700"
              type="button"
              onClick={addSchedule}
            >
              추가
            </Button>
          </div>

          <div className="mb-8 mt-4">
            <p className="text-base h-8 font-medium">추가한 예약 시간</p>
            <div className="grid grid-cols-8 gap-2">
              {schedules.map((schedule, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={index}>
                  <div className="col-span-2 flex h-9 w-full items-center rounded-[4px] bg-gray-200 pl-2">
                    {schedule.date.toISOString().split("T")[0]}
                  </div>
                  <div className="col-span-2 flex h-9 items-center rounded-[4px] bg-gray-200 pl-2">
                    {schedule.startTime}
                  </div>
                  <div className="col-span-2 flex h-9 items-center rounded-[4px] bg-gray-200 pl-2">
                    {schedule.endTime}
                  </div>
                  <Button
                    className="text-base col-span-2 h-9 rounded-[4px] bg-gray-500 font-medium text-white hover:bg-gray-600"
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
          <p className="mb-4 font-medium">* 소개이미지는 최대 4개까지 등록할 수 있습니다.</p>
        </div>
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
      <Popup
        id="duplicate"
        text="중복된 시간대가 존재합니다."
        leftButton="확인"
        onChangeLeftButton={() => {
          closePopup("duplicate");
        }}
      />
      <Popup
        id="timeMissing"
        text="시작 시간과 종료 시간을 모두 입력해 주세요."
        leftButton="확인"
        onChangeLeftButton={() => {
          closePopup("timeMissing");
        }}
      />
    </div>
  );
}
