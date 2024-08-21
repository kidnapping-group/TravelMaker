import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";

function HomeRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HomeRootLayout;
