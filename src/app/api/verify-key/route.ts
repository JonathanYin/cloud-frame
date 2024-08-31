import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { secretKey } = await request.json();

	if (secretKey === process.env.UPLOAD_SECRET_KEY) {
		return NextResponse.json({ success: true });
	} else {
		return NextResponse.json({ error: "Incorrect secret key" }, { status: 401 });
	}
}
