"use client";

import { Star } from "@/components/icons/star";
import { CldImage, CldImageProps } from "next-cloudinary";
import { MarkAsFavorite } from "./actions";
import { useState, useTransition } from "react";
import { SearchResult } from "./page";
import { SolidStar } from "@/components/icons/solidstar";

export function CloudImage(
  props: {
    imageData: SearchResult;
    onUnfavorite?: (unfavoritedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();

  const { imageData, onUnfavorite } = props;

  const [isFavorite, setIsFavorite] = useState(
    imageData.tags.includes("favorite")
  );

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorite ? (
        <SolidStar
          onClick={() => {
            onUnfavorite?.(imageData);
            setIsFavorite(false);
            startTransition(() => {
              MarkAsFavorite(imageData.public_id, false);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-violet-500 cursor-pointer"
        />
      ) : (
        <Star
          onClick={() => {
            setIsFavorite(true);
            startTransition(() => {
              MarkAsFavorite(imageData.public_id, true);
            });
          }}
          className="absolute top-2 right-2 hover:text-violet-500 cursor-pointer"
        />
      )}
    </div>
  );
}
