"use client";

import activitiesAPI from "@/apis/activitiesAPI";
import myActivitiesAPI from "@/apis/myActivitiesAPI";
import AddInput from "@/app/(user)/myactivities/edit/_components/AddInput";
import AddressAutoComplete from "@/app/(user)/myactivities/edit/_components/AddressAutoComplete";
import ImageInput from "@/app/(user)/myactivities/edit/_components/ImageInput";
import SubImagesInput from "@/app/(user)/myactivities/edit/_components/SubImagesInput";
import { Button } from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import { setHours, setMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Edit({ params: { activityId } }: { params: { activityId: string } }) {
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
  const [schedules, setSchedules] = useState<
    { id: number | null; date: Date; startTime: string; endTime: string }[]
  >([]);
  const [bannerImageUrl, setBannerImageUrl] = useState("");

  const [subImageUrls, setSubImageUrls] = useState<{ id: number | null; imageUrl: string }[]>([]);
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await activitiesAPI.getInfo(Number(activityId));

        setTitle(res.title);
        setSelectedCategory(res.category);
        setDescription(res.description);
        setPrice(res.price.toString());
        setAddress(res.address);
        setSchedules(
          res.schedules.map(schedule => ({
            id: schedule.id,
            date: new Date(schedule.date),
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          })),
        );
        setBannerImageUrl(res.bannerImageUrl);
        setSubImageUrls(res.subImages);
      } catch (error) {
        openPopup("failFetch");
      }
    };

    fetchActivityData();
  }, [activityId]);

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
    if (!currentSchedule.startTime || !currentSchedule.endTime) {
      openPopup("timeMissing");
      return;
    }
    const isDuplicate = schedules.some(
      schedule =>
        schedule.date.toISOString().split("T")[0] ===
          currentSchedule.date.toISOString().split("T")[0] &&
        schedule.startTime ===
          currentSchedule.startTime?.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }) &&
        schedule.endTime ===
          currentSchedule.endTime?.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
    );

    if (isDuplicate) {
      openPopup("duplicate");

      return;
    }

    setSchedules([
      ...schedules,
      {
        id: null,
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

  const removeSchedule = (id: number | null, index: number) => {
    if (id !== null) {
      setScheduleIdsToRemove(prev => [...prev, id]);
    }
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const now = new Date();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const subImageUrlsToAdd = subImageUrls
      .filter(image => image.id === null)
      .map(image => image.imageUrl);
    const schedulesToAdd = schedules
      .filter(schedule => schedule.id === null)
      .map(schedule => ({
        date: schedule.date.toISOString().split("T")[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      }));
    const formData = {
      title,
      category: selectedCategory,
      description,
      address,
      price: parseFloat(price),
      bannerImageUrl,
      subImageIdsToRemove,
      subImageUrlsToAdd,
      scheduleIdsToRemove,
      schedulesToAdd,
    };
    try {
      await myActivitiesAPI.patch(Number(activityId), formData);
      openPopup("success");
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
      <form onSubmit={handleSubmit} className="h-[100vh] px-3 pb-[150px]">
        <div className="flex justify-between px-1">
          <p className="text-3xl font-bold">내 체험 등록</p>
          <Button disabled={isSubmitDisabled} type="submit">
            수정
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
            <Dropdown
              menuItems={dropdownList}
              onChangeDropdown={handleCategory}
              placeHolder="카테고리"
              wide
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
            label="체험 비용"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="인당 체험 비용을 입력해 주세요"
            type="number"
            min={0}
          />
          <AddressAutoComplete address={address} setAddress={setAddress} />
          <div className="mb-2.5 text-xl font-bold">예약 가능한 시간대</div>
          <div className="grid grid-cols-8 grid-rows-2 gap-1">
            <p className="text-base col-span-3 font-medium">날짜</p>
            <p className="text-base col-span-2 font-medium">시작 시간</p>
            <p className="text-base col-span-2 font-medium">종료 시간</p>
            <p className="text-base col-span-1 font-medium">추가</p>
            <div className="col-span-3 w-full">
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
                    : setHours(setMinutes(new Date(), 0), 0)
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
              className="text-base col-span-1 h-9 rounded-[4px] bg-primary-500 font-medium text-white hover:bg-primary-600 active:bg-primary-700"
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
                  <div className="col-span-3 flex h-9 max-w-[211.2px] items-center rounded-[4px] bg-gray-200 pl-2">
                    {schedule.date.toISOString().split("T")[0]}
                  </div>
                  <div className="col-span-2 flex h-9 items-center rounded-[4px] bg-gray-200 pl-2">
                    {schedule.startTime}
                  </div>
                  <div className="col-span-2 flex h-9 items-center rounded-[4px] bg-gray-200 pl-2">
                    {schedule.endTime}
                  </div>
                  <Button
                    className="text-base col-span-1 h-9 rounded-[4px] bg-gray-500 font-medium text-white hover:bg-gray-600"
                    type="button"
                    onClick={() => removeSchedule(schedule.id, index)}
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
          <SubImagesInput
            subImageUrls={subImageUrls}
            setSubImageUrls={setSubImageUrls}
            setSubImageIdsToRemove={setSubImageIdsToRemove}
          />
          <p>* 소개이미지는 최대 4개까지 등록할 수 있습니다.</p>
        </div>
      </form>
      <Popup
        id="failFetch"
        text="기존 체험정보 불러오기에 실패했습니다."
        leftButton="확인"
        onChangeLeftButton={() => {
          closePopup("failFetch");
        }}
      />
      <Popup
        id="success"
        text="체험수정이 완료되었습니다."
        leftButton="확인"
        onChangeLeftButton={() => {
          closePopup("success");
          router.push("/myactivities");
        }}
      />
      <Popup
        id="fail"
        text="체험수정에 실패했습니다."
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
