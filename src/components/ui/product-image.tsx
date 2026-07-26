import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  getImageSrc,
  IMAGE_BLUR,
  IMAGE_SIZES,
  type ImageSize,
} from "@/lib/image-utils";

interface ProductImageProps {
  src: string | undefined | null;
  alt: string;
  size?: ImageSize;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ProductImage({
  src,
  alt,
  size = "card",
  priority = false,
  className,
  sizes,
}: ProductImageProps) {
  return (
    <Image
      src={getImageSrc(src, size)}
      alt={alt}
      fill
      sizes={sizes ?? IMAGE_SIZES[size]}
      quality={75}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
