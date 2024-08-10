import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .min(2, "이름을 입력해주세요")
    .max(10, "10자 이하로 작성해주세요")
    .regex(/^[^\d!@#$%^&*(),.?":{}|<>]*$/, "이름에 숫자나 특수문자가 포함될 수 없습니다"),
  email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식으로 작성해 주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요"),
  confirmPassword: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요"),
  price: z.preprocess(
    value => {
      const parsedValue = Number(value);
      if (Number.isNaN(parsedValue)) {
        return value;
      }
      return parsedValue;
    },
    z.number().min(0, "0이상의 숫자만 입력해주세요"),
  ),
  textarea: z.string().max(500, "500자 이하로 작성해주세요"),
});

export default baseSchema;
