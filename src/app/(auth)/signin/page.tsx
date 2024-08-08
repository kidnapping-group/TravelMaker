"use client";

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
    </div>
  );
}

export default SignIn;
