import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	try {
		const { secretKey } = await request.json();

		if (secretKey !== process.env.UPLOAD_SECRET_KEY) {
			return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
		}

		return NextResponse.json({ success: true, message: "Upload confirmed" });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
	}
}
