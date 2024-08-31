"use client";

import { useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UploadButton() {
	const router = useRouter();
	const [isUploading, setIsUploading] = useState(false);

	const verifyAndUpload = useCallback(async () => {
		const secretKey = prompt("Enter secret key") || "";
		const response = await fetch("/api/verify-key", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ secretKey }),
		});

		if (response.ok) {
			// If key is correct, open the Cloudinary widget
			(document.getElementById("cloudinary_upload_button") as HTMLElement).click();
		} else {
			alert("Incorrect secret key. Upload not allowed.");
		}
	}, []);

	const handleUpload = useCallback(
		(result: any) => {
			console.log("Upload successful:", result);
			router.refresh();
		},
		[router]
	);

	return (
		<>
			<Button onClick={verifyAndUpload} disabled={isUploading}>
				<div className="flex gap-2 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 m-auto">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
					</svg>
					{isUploading ? "Uploading..." : "Upload"}
				</div>
			</Button>
			<CldUploadWidget uploadPreset="auttj4ku" onUpload={handleUpload} onOpen={() => setIsUploading(true)} onClose={() => setIsUploading(false)}>
				{({ open }) => {
					return (
						<button
							id="cloudinary_upload_button"
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								open();
							}}
							style={{ display: "none" }}
						/>
					);
				}}
			</CldUploadWidget>
		</>
	);
}
