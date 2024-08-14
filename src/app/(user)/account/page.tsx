"use client";

import userAPI from "@/apis/usersAPI";
import Input from "@/components/Input/Input";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ProfileUploader from "../_components/ProfileUploader";

type UserData = {
  nickname: string;
  email: string;
  profileImageUrl: string | null;
};

type AccountFormData = z.infer<typeof accountSchema>;

const accountSchema = baseSchema
  .pick({ nickname: true, password: true, confirmPassword: true, profileImageUrl: true })
  .refine(data => data.confirmPassword === data.password, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    mode: "all",
  });

  const [userData, setUserData] = useState<UserData>({
    nickname: "",
    email: "",
    profileImageUrl: "",
  });

  const onSubmit = async (data: AccountFormData) => {
    await userAPI.patchUsers({
      nickname: data?.nickname,
      newPassword: data?.password,
      profileImageUrl: data?.profileImageUrl,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userAPI.getUsers();
      setUserData({
        nickname: data.nickname,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
      });
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[400px] flex-col gap-[10px] tablet:w-[700px] pc:w-[700px]"
      >
        <div className="flex items-center gap-[100px]">
          <ProfileUploader
            profileImageUrl={userData.profileImageUrl}
            register={register("profileImageUrl")}
          />
          <div className="flex flex-col">
            <h1 className="text-[30px] font-semibold text-primary-600 tablet:text-[40px] pc:text-[40px]">
              {userData.nickname}
            </h1>
            <p className="text-[20px] text-primary-600">{userData.email}</p>
          </div>
        </div>

        <Input
          register={register("nickname")}
          type="text"
          name="name"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          error={errors.nickname}
          touched={touchedFields.nickname}
        />

        <Input
          register={register("password")}
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          touched={touchedFields.password}
        />

        <Input
          register={register("confirmPassword")}
          type="password"
          name="confirmPassword"
          label="비밀번호 재입력"
          placeholder="비밀번호를 한번 더 입력해주세요"
          error={errors.confirmPassword}
          touched={touchedFields.confirmPassword}
        />
        <button
          type="submit"
          disabled={!isValid}
          className="hover:bg-blue-700 focus: mt-[30px] h-[45px] w-[120px] justify-end rounded-[10px] bg-blue-500 text-[14px] font-semibold leading-[24px] text-white outline-primary-600 focus:bg-primary-600 disabled:bg-gray-300"
        >
          수정
        </button>
      </form>
    </div>
  );
}

export default Account;
