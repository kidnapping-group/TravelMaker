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
    <div className="relative bg-gray-100">
      <Header />
      <div className="h-100vh w-100vw fixed inset-0 box-border flex justify-center bg-gray-100 pt-[110px] pc:pt-[75px]">
        <div className="relative flex w-full max-w-[1230px] justify-center pc:gap-6">
          <div className="top-[200px]">
            <Navigation />
          </div>
          <div className="w-full max-w-[800px] bg-gray-100">{children}</div>
        </div>
      </div>
    </div>
  );
}
export default UserRootLayout;
