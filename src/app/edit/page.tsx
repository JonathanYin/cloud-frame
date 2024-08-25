"use client";

import { Button } from "@/components/ui/button";
import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";

interface CustomCldImageProps extends CldImageProps {
	tint?: string;
	blur?: string;
	grayscale?: boolean;
}

const CustomCldImage = (props: CustomCldImageProps) => {
	return <CldImage {...props} />;
};

export default function EditPage({ searchParams: { publicId } }: { searchParams: { publicId: string } }) {
	const [transformation, setTransformation] = useState<undefined | "generative-fill" | "tint" | "blur" | "grayscale">();

	return (
		<section>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between">
					<h1 className="text-4xl font-bold">Edit {publicId}</h1>
				</div>
				<div className="flex gap-4">
					<Button onClick={() => setTransformation(undefined)} variant="ghost">
						Clear All
					</Button>

					<Button onClick={() => setTransformation("generative-fill")} variant="secondary">
						Apply Generative Fill
					</Button>

					<Button onClick={() => setTransformation("tint")} variant="secondary">
						Apply Tint
					</Button>

					<Button onClick={() => setTransformation("blur")} variant="secondary">
						Apply Blur
					</Button>

					<Button onClick={() => setTransformation("grayscale")} variant="secondary">
						Convert to Grayscale
					</Button>
				</div>

				<div className="grid grid-cols-2 gap-12">
					<CldImage src={publicId} width="400" height="300" alt="Description of my image" />

					{transformation === "generative-fill" && <CldImage src={publicId} width="400" height="300" alt="Description of my image" crop="pad" fillBackground />}

					{transformation === "tint" && <CustomCldImage src={publicId} width="400" height="300" alt="Description of my image" tint="equalize:80:blue:blueviolet" />}

					{transformation === "blur" && <CustomCldImage src={publicId} width="400" height="300" alt="Description of my image" blur="800" />}

					{transformation === "grayscale" && <CustomCldImage src={publicId} width="400" height="300" alt="Description of my image" grayscale />}
				</div>
			</div>
		</section>
	);
}
