import authAPI from "@/apis/authAPI";
import userAPI from "@/apis/usersAPI";
import { openPopup } from "@/components/Popup";
import useAuthStore from "@/store/useAuthStore";
import baseSchema from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const useLogin = () => {
  const setUser = useAuthStore(state => state.setUser);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const login = async (data: z.infer<typeof baseSchema>) => {
    try {
      const loginData = await authAPI.login(data);
      if (loginData) {
        const userData = await userAPI.getUsers();
        setUser(userData);
        setIsSuccess(true);
      }
    } catch (error) {
      let err = String(error);
      if (err === "비밀번호가 일치하지 않습니다.") {
        setIsPasswordWrong(true);
        setIsSuccess(false);
        openPopup();
      } else {
        setIsPasswordWrong(false);
        setIsSuccess(false);
        openPopup();
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  });

  return { login, isPasswordWrong };
};

export default useLogin;
