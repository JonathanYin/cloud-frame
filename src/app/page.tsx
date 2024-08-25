"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export type UploadResult = {
	info: {
		public_id: string;
	};
	event: "success";
};

export default function Home() {
	// const [imageId, setImageId] = useState("qbamwpfs81pwy2dgmdx6");
	return (
		// <main className="flex min-h-screen flex-col items-center justify-between p-24">
		<div>
			<div className="space-y-1">
				<h4 className="text-lg font-large leading-none">Welcome to Cloud Frame</h4>
				<p className="text-md text-muted-foreground">A simple, cloud-based photo library and editor</p>
			</div>
			<Separator className="my-4" />
			<div className="flex h-5 items-center space-x-4 text-sm">
				<div>Blog</div>
				<div className="h-full w-px bg-gray-300" />
				<div>Docs</div>
				<div className="h-full w-px bg-gray-300" />
				<div>Source</div>
			</div>
			{/* <CldUploadButton
        onUpload={(result: UploadResult) => {
          setImageId(result.info.public_id);
        }}
        uploadPreset="auttj4ku"
      />

      {imageId && (
        <CldImage
          width="400"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )} */}
		</div>
		// </main>
	);
}
