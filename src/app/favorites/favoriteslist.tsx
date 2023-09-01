"use client";

import { useEffect, useState } from "react";
import { CloudImage } from "../gallery/cloudimage";
import { SearchResult } from "../gallery/page";
import { ImageGrid } from "@/components/imagegrid";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="Description of my image"
            onUnfavorite={(unfavoritedResource) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unfavoritedResource.public_id
                )
              );
            }}
          />
        );
      }}
    />
  );
}
