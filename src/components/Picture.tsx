"use client";

import useImageError from "@/hooks/useImageError";

interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
  errorSrc?: string;
  priority?: boolean;
  fill?: boolean;
  draggable?: boolean;
}

function Picture({ src, priority, fill, style, errorSrc, ...props }: PictureProps) {
  const [errorImage] = useImageError(["/images/noImage.png"] || errorSrc);

  return (
    <img
      src={errorImage.src || src}
      loading={priority ? "eager" : props.loading || "lazy"}
      style={{
        width: fill ? "100%" : undefined,
        height: fill ? "100%" : undefined,
        position: fill ? "absolute" : undefined,
        objectFit: fill ? "cover" : undefined,
        left: fill ? "50%" : undefined,
        top: fill ? "50%" : undefined,
        transform: fill ? "translate(-50%, -50%)" : undefined,
        ...style,
      }}
      draggable={props.draggable ?? true}
      onError={errorImage.onError}
      {...props}
    />
  );
}

export default Picture;
