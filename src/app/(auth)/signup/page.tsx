"use client";

import authAPI from "@/apis/authAPI";
import usersAPI from "@/apis/usersAPI";
import { Button } from "@/components/Button";
import Input from "@/components/Input/Input";
import Popup, { openPopup } from "@/components/Popup";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<typeof baseSchema>;
const signupSchema = baseSchema
  .pick({ email: true, nickname: true, password: true, confirmPassword: true })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });
  const router = useRouter();
  const [existEmail, setExistEmail] = useState(false);
  const searchParams = useSearchParams();
  const confirm = searchParams.get("confirm");

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { email, nickname, password } = data;
      const postData = { email, nickname, password };
      await usersAPI.postSingup(postData);
      openPopup();
      if (confirm) {
        const loginData = { email, password };
        await authAPI.login(loginData);
      } else {
        router.push("/singin");
      }
    } catch (error) {
      setExistEmail(true);
      openPopup();
    }
  };

  return (
    <div className="flex w-full max-w-[640px] flex-col items-center gap-12">
      <Link href="/">
        <Image src="/images/logo_big.png" width={450} height={192} alt="메인로고" />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-full flex-col gap-[28px]">
        <Input
          register={register("email")}
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          error={errors.email}
          touched={touchedFields.email}
        />
        <Input
          register={register("nickname")}
          type="text"
          name="nickname"
          label="닉네임"
          placeholder="이메일을 입력해주세요"
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
          name=" confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해주세요"
          error={errors.confirmPassword}
          touched={touchedFields.confirmPassword}
        />
        <Button size="wide" disabled={!isValid}>
          회원가입 하기
        </Button>
        <div className="-mt-1 text-center">
          회원이신가요?{" "}
          <Link href="/signin">
            <span className="text-blue-500 underline">로그인</span>
          </Link>
        </div>
      </form>

      {/* <div className="flex items-center gap-[37.5px] text-center text-gray-500">
        <hr className="w-[180px] border-gray-300" />
        <span className="w-[205px] text-xl">SNS 계정으로 회원가입하기</span>
        <hr className="w-[180px] border-gray-300" />
      </div> */}

      <div className="flex justify-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300">
          <Image src="/icons/icon-google.svg" width={27} height={27} alt="Google 회원가입" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300">
          <Image src="/icons/icon-kakao.svg" width={27} height={27} alt="카카오톡 회원가입" />
        </div>
      </div>
      {existEmail ? (
        <Popup text="이메일이 이미 존재합니다." onCloseButton="확인" />
      ) : (
        <Popup
          text="회원가입이 완료되었습니다. 자동으로 로그인할까요?"
          onChangeButton="로그인하기"
          onCloseButton="취소"
        />
      )}
    </div>
  );
}

export default SignUp;
