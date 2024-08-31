"use client";

import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UploadButton() {
	const router = useRouter();
	const [isUploading, setIsUploading] = useState(false);

	const handleUpload = async (result: any) => {
		setIsUploading(true);
		const secretKey = prompt("Enter secret key") || "";

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secretKey: secretKey,
				}),
			});

			const data = await response.json();

			if (data.success) {
				console.log("Upload successful:", result);
				alert("Upload successful!");

				setTimeout(() => {
					console.log("refreshed");
					router.refresh();
				}, 1000);
			} else {
				throw new Error(data.message || "Upload failed");
			}
		} catch (error) {
			console.error("Upload error:", error);
			alert(error instanceof Error ? error.message : "Upload failed. Please try again.");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Button asChild disabled={isUploading}>
			<CldUploadButton uploadPreset="auttj4ku" onUpload={handleUpload}>
				<div className="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 m-auto">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
					</svg>
					{isUploading ? "Uploading..." : "Upload"}
				</div>
			</CldUploadButton>
		</Button>
	);
}
