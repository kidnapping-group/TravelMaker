"use client";

function LoadingSpinner() {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <span
        className="h-[130px] w-[130px] rounded-full border-4 border-white"
        style={{
          borderWidth: "16px",
          borderStyle: "dotted",
          borderTopColor: "transparent",
          animation: "spin 1.5s linear infinite",
        }}
      />
    </div>
  );
}

export default LoadingSpinner;
