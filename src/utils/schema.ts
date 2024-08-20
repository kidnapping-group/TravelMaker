import { z } from "zod";

const baseSchema = z.object({
  nickname: z
    .string()
    .min(2, "이름을 입력해주세요")
    .max(13, "13자 이하로 작성해주세요")
    .regex(/^[^!@#$%^&*(),.?":{}|<>]*$/, "이름에 특수문자가 포함될 수 없습니다")
    .optional(),
  email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식으로 작성해 주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요").optional(),
  confirmPassword: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "8자 이상 입력해주세요")
    .optional(),
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
  profileImageUrl: z.any().optional(),
});

export default baseSchema;
