"use client";

import { Star } from "@/components/icons/star";
import { CldImage } from "next-cloudinary";
import { MarkAsFavorite } from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";
import { SolidStar } from "@/components/icons/solidstar";

export function CloudImage(props: any & { imageData: SearchResult }) {
  const [transition, startTransition] = useTransition();

  const { imageData } = props;

  const isFavorite = imageData.tags.includes("favorite");

  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorite ? (
        <SolidStar
          onClick={() => {
            startTransition(() => {
              MarkAsFavorite(imageData.public_id, false);
            });
          }}
          className="absolute top-2 right-2 hover:text-white text-violet-500 cursor-pointer"
        />
      ) : (
        <Star
          onClick={() => {
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
