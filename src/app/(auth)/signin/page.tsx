"use client";

import Image from "next/image";
import Link from "next/link";
import authAPI from "@/apis/authAPI";
import Input from "@/components/Input/Input";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<typeof baseSchema>;
const loginSchema = baseSchema.pick({ email: true, password: true });

function SignIn() {
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authAPI.login(data);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[400px] flex-col gap-[10px]">
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
          register={register("password")}
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password}
          touched={touchedFields.password}
        />
        <button
          type="submit"
          disabled={!isValid}
          className="hover:bg-blue-700 h-[45px] w-full rounded-[10px] bg-blue-500 text-[14px] font-semibold leading-[24px] text-white disabled:bg-gray-300"
        >
          Submit
        </button>
      </form>
      <div className="m-auto mt-[90px] w-full max-w-[460px]">
        <p className="mt-[24px] text-center text-[16px] font-medium">
          아직 계정이 없으신가요?
          <Link href="signIn" className="ml-[12px] text-[16px] text-[#10B981] underline">
            가입하기
          </Link>
        </p>
        <div className="relative mb-[16px] mt-[48px] text-center before:absolute before:inset-y-1/2 before:left-0 before:z-[-1] before:h-px before:w-full before:bg-[#ffffff]">
          <p className="bg-background inline-block px-[24px] text-[16px]">OR</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-medium">간편 로그인하기</p>
          <div className="flex gap-3">
            <Link href={GOOGLE_AUTH_URL}>
              <Image src="/images/google.png" alt="구글" width={42} height={42} />
            </Link>
            <Image src="/images/kakaotalk.png" alt="카카오" width={42} height={42} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
