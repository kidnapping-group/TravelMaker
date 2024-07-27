import { redirect } from "next/navigation";

function Page() {
  redirect("/test");
  return null;
}

export default Page;
