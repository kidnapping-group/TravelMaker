import Header from "../_components/Header";
import Navigation from "./_components/Navigation";

function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="relative mb-20 flex w-full max-w-[1280px] flex-col px-5 tablet:px-10 pc:mx-auto pc:max-w-[1200px] pc:flex-row pc:p-0">
        <Navigation />
        <div className="mt-[120px] w-full pc:ml-[290px] pc:mt-[90px]">{children}</div>
      </main>
    </>
  );
}
export default UserRootLayout;
