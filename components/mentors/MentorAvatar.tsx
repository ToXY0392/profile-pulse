"use client";

import { useState } from "react";

type MentorAvatarProps = {
  name: string;
  imageUrl?: string;
  size?: "md" | "lg";
};

const sizeClasses = {
  md: "h-14 w-14 text-sm",
  lg: "h-20 w-20 text-lg",
};

export function MentorAvatar({
  name,
  imageUrl,
  size = "md",
}: MentorAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const initial = name.slice(0, 1).toUpperCase();
  const showImage = imageUrl && !imgFailed;

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt=""
        onError={() => setImgFailed(true)}
        className={`${sizeClasses[size]} shrink-0 rounded-full border border-zinc-200 object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${sizeClasses[size]} shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 font-semibold text-zinc-500`}
      aria-hidden
    >
      {initial}
    </div>
  );
}
