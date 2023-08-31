import cloudinary from "cloudinary";
import { CloudImage } from "../gallery/cloudimage";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/forcerefresh";
import FavoritesList from "./favoriteslist";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(20)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favorites</h1>
        </div>

        <FavoritesList initialResources={results.resources} />
      </div>
    </section>
  );
}
