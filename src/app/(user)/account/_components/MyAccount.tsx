"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { User } from "@/apis/API.type";
import userAPI from "@/apis/usersAPI";

import { Button } from "@/components/Button";
import Input from "@/components/Input/Input";
import Popup, { closePopup, openPopup } from "@/components/Popup";

import socialLoginStore from "@/store/socialLoginStore";
import baseSchema from "@/utils/schema";

import ProfileEditor from "./ProfileEditor";

type UserData = Pick<User, "nickname" | "email" | "profileImageUrl">;

type AccountFormValues = z.infer<typeof AccountValidationSchema>;

const AccountValidationSchema = baseSchema
  .pick({
    nickname: true,
    profileImageUrl: true,
  })
  .extend({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    values => {
      if (values.password) {
        return values.password.length >= 8;
      }
      return true;
    },
    {
      message: "비밀번호는 8자 이상이어야 합니다",
      path: ["password"],
    },
  )
  .refine(
    values => {
      if (values.password) {
        return values.password === values.confirmPassword;
      }
      return true;
    },
    {
      message: "비밀번호가 일치하지 않습니다",
      path: ["confirmPassword"],
    },
  );

function MyAccount() {
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState<string | null>(null);
  const [isSocialLogin, setIsSocialLogin] = useState<boolean>(false);
  const [initialFormValues, setInitialFormValues] = useState<AccountFormValues | null>(null);
  const [initialProfileImageUrl, setInitialProfileImageUrl] = useState<string | null>(null);

  const { social, updateUserInfo } = socialLoginStore(state => ({
    social: state.social,
    updateUserInfo: state.commonLogin,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    setValue,
  } = useForm<AccountFormValues>({
    resolver: zodResolver(AccountValidationSchema),
    mode: "onSubmit",
  });

  const { data: fetchedUserData, refetch: refetchUserData } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: userAPI.getUsers,
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedData: {
      nickname: string | undefined;
      newPassword?: string | undefined;
      profileImageUrl: string | null;
    }) => userAPI.patchUsers(updatedData),
    onSuccess: data => {
      openPopup("changeUserData");
      refetchUserData();
      updateUserInfo({
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        profileImageUrl: data.profileImageUrl,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        social,
      });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: userAPI.postUsersImage,
  });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      uploadImageMutation.mutate(formData, {
        onSuccess: data => {
          const imageUrl = data.profileImageUrl;
          setCurrentProfileImageUrl(imageUrl);
        },
      });
    }
  };

  const handleProfileImageReset = () => {
    setValue("profileImageUrl", null);
    setCurrentProfileImageUrl(null);
  };

  const handleFormSubmit = async (formData: AccountFormValues) => {
    let hasFormChanged = false;

    if (initialFormValues && isSocialLogin) {
      hasFormChanged =
        initialFormValues.nickname !== formData.nickname ||
        initialFormValues.profileImageUrl !== formData.profileImageUrl;
    } else if (initialFormValues) {
      hasFormChanged = Object.keys(initialFormValues).some(
        key =>
          initialFormValues[key as keyof AccountFormValues] !==
          formData[key as keyof AccountFormValues],
      );
    }

    const hasProfileImageChanged = initialProfileImageUrl !== currentProfileImageUrl;

    if (!hasFormChanged && !hasProfileImageChanged) {
      openPopup("noChanges");
      return;
    }

    updateUserMutation.mutate({
      nickname: formData.nickname,
      newPassword: formData.password || undefined,
      profileImageUrl: currentProfileImageUrl || null,
    });
  };

  useEffect(() => {
    setIsSocialLogin(social);

    const initialValues = {
      nickname: fetchedUserData?.nickname || "",
      password: "",
      confirmPassword: "",
      profileImageUrl: fetchedUserData?.profileImageUrl || null,
    };

    reset(initialValues);
    setInitialFormValues(initialValues);
    setCurrentProfileImageUrl(fetchedUserData?.profileImageUrl || null);
    setInitialProfileImageUrl(fetchedUserData?.profileImageUrl || null);
  }, [fetchedUserData, reset, social]);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mx-[10px] flex w-full max-w-[700px] flex-col gap-[10px]"
      >
        <div className="flex items-center gap-[80px] tablet:gap-[100px] pc:gap-[100px]">
          <ProfileEditor
            register={register("profileImageUrl")}
            profileImage={currentProfileImageUrl}
            onChangeImage={handleProfileImageChange}
            onImageReset={handleProfileImageReset}
            disabled={isSocialLogin}
          />
          <div className="flex flex-col">
            <h1 className="text-[30px] font-semibold text-primary-600 tablet:text-[40px] pc:text-[40px]">
              {fetchedUserData?.nickname}
            </h1>
            <p className="text-[15px] text-primary-600">{fetchedUserData?.email}</p>
          </div>
        </div>

        <Input
          register={register("nickname")}
          type="text"
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          error={errors.nickname}
          touched={touchedFields.nickname}
          disabled={isSocialLogin}
        />

        <Input
          register={register("password")}
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          touched={touchedFields.password}
          disabled={isSocialLogin}
        />

        <Input
          register={register("confirmPassword")}
          type="password"
          name="confirmPassword"
          label="비밀번호 재입력"
          placeholder="비밀번호를 한번 더 입력해주세요"
          error={errors.confirmPassword}
          touched={touchedFields.confirmPassword}
          disabled={isSocialLogin}
        />

        {isSocialLogin ? (
          <p className="text-lg font-semibold text-red-500">
            소셜 로그인 시 사용자 정보를 수정할 수 없습니다
          </p>
        ) : (
          <Button type="submit" size="medium">
            수정
          </Button>
        )}
      </form>

      <Popup
        id="changeUserData"
        text="내 정보 수정 완료!"
        leftButton="확인"
        onChangeLeftButton={() => closePopup("changeUserData")}
      />

      <Popup
        id="noChanges"
        text="변경사항이 없습니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("noChanges")}
      />
    </div>
  );
}

export default MyAccount;
