function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full bg-gray-100">
      <div className="mx-auto flex h-full w-full max-w-[640px] items-center px-2 pt-10">
        {children}
      </div>
    </div>
  );
}

export default AuthRootLayout;
