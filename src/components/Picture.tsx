import React from "react";

interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

function Picture({ src, alt, width, height, className, loading = "lazy" }: PictureProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}

export default Picture;
