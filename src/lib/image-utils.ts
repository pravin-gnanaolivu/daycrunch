export const IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=";

export type ImageSize = "thumb" | "card" | "detail" | "hero";

const WIDTHS: Record<ImageSize, number> = {
  thumb: 80,
  card: 400,
  detail: 800,
  hero: 1200,
};

export function getImageSrc(
  url: string | undefined | null,
  size: ImageSize = "card",
): string {
  if (!url) return "/placeholder.svg";

  const w = WIDTHS[size];

  if (url.startsWith("/")) return url;

  if (url.includes("images.unsplash.com")) {
    const base = url.split("?")[0];
    return `${base}?w=${w}&q=75&auto=format&fit=crop`;
  }

  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/w_${w},c_limit,q_auto,f_auto/`);
  }

  if (url.includes("images.pexels.com")) {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}auto=compress&cs=tinysrgb&w=${w}`;
  }

  return url;
}

export const IMAGE_SIZES = {
  card: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  detail: "(max-width: 1024px) 100vw, 50vw",
  thumb: "80px",
  hero: "100vw",
} as const;
