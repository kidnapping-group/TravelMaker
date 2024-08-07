import SideNavigation from "@/app/(user)/_components/SideNavigation";

function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="items-center justify-center gap-6 px-[20px] md:flex">
      <div className="md:sticky md:top-[300px] md:bottom-[600px]">
        <SideNavigation />
      </div>
      {children}
    </div>
  );
}

export default UserRootLayout;
