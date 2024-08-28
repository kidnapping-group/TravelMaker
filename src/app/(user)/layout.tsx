import Navigation from "@/app/(user)/_components/Navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Header from "../_components/Header";

function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = cookies().get("accessToken");

  if (!accessToken) {
    redirect("/signin");
  }
  return (
    <>
      <Header />
      <main className="mb-20 flex w-full max-w-[1280px] px-5 tablet:mt-5 tablet:px-10 pc:mx-auto pc:max-w-[1200px] pc:p-0">
        <Navigation />
        <div className="grow tablet:ml-5">{children}</div>
      </main>
    </>
  );
}
export default UserRootLayout;
