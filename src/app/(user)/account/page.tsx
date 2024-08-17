"use client";

import userAPI from "@/apis/usersAPI";
import { Button } from "@/components/Button";
import Input from "@/components/Input/Input";
import socialLoginStore from "@/store/socialLoginStore";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ProfileEditor from "../_components/ProfileEditor";

type UserData = {
  nickname?: string;
  email?: string;
  profileImageUrl?: string | null;
};

type AccountFormData = z.infer<typeof commonAccountSchema>;

const socialAccountSchema = baseSchema.pick({
  nickname: true,
  profileImageUrl: true,
});

const commonAccountSchema = baseSchema
  .pick({ nickname: true, password: true, confirmPassword: true, profileImageUrl: true })
  .refine(data => data.confirmPassword === data.password, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

function Account() {
  const [profileImage, setProfileImage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { social } = socialLoginStore(state => ({
    social: state.social,
  }));

  const selectedSchema = isDisabled ? socialAccountSchema : commonAccountSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    reset,
  } = useForm<AccountFormData>({
    resolver: zodResolver(selectedSchema),
    mode: "all",
  });

  const { data: userData, refetch } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: userAPI.getUsers,
  });

  const userDataPatchMutation = useMutation({
    mutationFn: userAPI.patchUsers,
    onSuccess: () => {
      refetch();
    },
  });

  const imagePostMutation = useMutation({
    mutationFn: userAPI.postUsersImage,
    onSuccess: () => {
      refetch();
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      imagePostMutation.mutate(formData, {
        onSuccess: data => {
          const imageUrl = data.profileImageUrl;
          setProfileImage(imageUrl);
        },
      });
    }
  };

  const handleImageReset = async () => {
    const response = await fetch("/images/defaultProfile.png");
    const blob = await response.blob();
    const defaultFile = new File([blob], "defaultProfile.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("image", defaultFile);

    imagePostMutation.mutate(formData, {
      onSuccess: data => {
        const imageUrl = data.profileImageUrl;
        setProfileImage(imageUrl);
      },
    });
  };

  const onSubmit = async (data: AccountFormData) => {
    userDataPatchMutation.mutate({
      nickname: data?.nickname,
      newPassword: data?.password,
      profileImageUrl: profileImage,
    });
  };

  useEffect(() => {
    setIsDisabled(social);
  }, [social]);

  useEffect(() => {
    if (userData?.profileImageUrl === null) {
      setProfileImage("/images/defaultProfile.png");
    } else {
      setProfileImage(userData?.profileImageUrl || "/images/defaultProfile.png");
    }
    reset({
      nickname: "",
      password: "",
      confirmPassword: "",
    });
  }, [userData, reset]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[400px] flex-col gap-[10px] tablet:w-[700px] pc:w-[700px]"
      >
        <div className="flex items-center gap-[80px] tablet:gap-[100px] pc:gap-[100px]">
          <ProfileEditor
            register={register("profileImageUrl")}
            profileImage={profileImage}
            handleImageChange={handleImageChange}
            handleImageReset={handleImageReset}
          />
          <div className="flex flex-col">
            <h1 className="text-[30px] font-semibold text-primary-600 tablet:text-[40px] pc:text-[40px]">
              {userData?.nickname || "닉네임"}
            </h1>
            <p className="text-[15px] text-primary-600">{userData?.email || "이메일"}</p>
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
          disabled={isDisabled}
        />

        <Input
          register={register("confirmPassword")}
          type="password"
          name="confirmPassword"
          label="비밀번호 재입력"
          placeholder="비밀번호를 한번 더 입력해주세요"
          error={errors.confirmPassword}
          touched={touchedFields.confirmPassword}
          disabled={isDisabled}
        />

        <Button type="submit" size="medium" disabled={!isValid}>
          수정
        </Button>
      </form>
    </div>
  );
}

export default Account;
