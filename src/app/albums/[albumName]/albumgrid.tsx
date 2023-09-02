"use client";

import { ImageGrid } from "@/components/imagegrid";
import { SearchResult } from "@/app/gallery/page";
import { CloudImage } from "@/components/cloudimage";

export default function AlbumGrid({ images }: { images: SearchResult[] }) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="Description of my image"
          />
        );
      }}
    />
  );
}
