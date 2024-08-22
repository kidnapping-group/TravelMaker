"use client";

import authAPI from "@/apis/authAPI";
import usersAPI from "@/apis/usersAPI";
import { Button } from "@/components/Button";
import Input from "@/components/Input/Input";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignUpFormData = z.infer<typeof baseSchema>;
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
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { email, nickname, password } = data;
      const postData = { email, nickname, password };
      await usersAPI.postSignup(postData);
      const loginData = { email, password };
      await authAPI.login(loginData);
      router.push("/");
    } catch (error) {
      openPopup("existEmail");
    }
  };

  return (
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
        name="confirmPassword"
        label="비밀번호 확인"
        placeholder="비밀번호를 한번 더 입력해주세요"
        error={errors.confirmPassword}
        touched={touchedFields.confirmPassword}
      />
      <Button size="wide" disabled={!isValid}>
        회원가입
      </Button>
      <div className="-mt-1 text-center">
        회원이신가요?{" "}
        <Link href="/signin">
          <span className="text-blue-500 underline">로그인</span>
        </Link>
      </div>
      <Popup
        id="existEmail"
        text="이메일이 이미 존재합니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("existEmail")}
      />
    </form>
  );
}

export default SignUp;
