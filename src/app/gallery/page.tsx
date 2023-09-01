import UploadButton from "./uploadbutton";
import cloudinary from "cloudinary";
import { ImageGrid } from "@/components/imagegrid";
import { CloudImage } from "../../components/cloudimage";
import GalleryGrid from "./gallerygrid";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(20)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>

        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}
