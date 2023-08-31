import UploadButton from "./uploadbutton";
import cloudinary from "cloudinary";
import { CloudImage } from "./cloudimage";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(1)
    .execute()) as { resources: SearchResult[] };

  console.log(results);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {results.resources.map((result) => (
            <CloudImage
              key={result.public_id}
              imageData={result}
              width="400"
              height="300"
              alt="Description of my image"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
