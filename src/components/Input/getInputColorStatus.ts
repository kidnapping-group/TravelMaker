import { FieldError } from "react-hook-form";

const getInputColorStatus = (error: FieldError | undefined, touched: boolean | undefined) => {
  if (error) {
    return "border border-red";
  }
  if (touched) {
    return "border border-blue";
  }
  return "";
};

export default getInputColorStatus;
