import SideNavigation from "@/app/(user)/_components/SideNavigation";

function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-gray-100">
      <div className="h-100vh fixed inset-0 box-border flex justify-center bg-gray-100 pt-[110px] tablet:pt-[72px]">
        <div className="relative flex w-full max-w-[1230px] justify-center gap-6">
          <div className="top-[200px]">
            <SideNavigation />
          </div>
          <div className="w-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default UserRootLayout;
