function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-[100vh] w-full bg-gray-100">
      <div className="mx-auto flex h-full w-full max-w-[640px] items-center">{children}</div>
    </div>
  );
}

export default AuthRootLayout;
