// app/api/imagekit-auth/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      console.error("❌ ImageKit keys not configured");
      return NextResponse.json(
        { error: "ImageKit not configured properly" },
        { status: 500 }
      );
    }

    console.log("🔐 Generating ImageKit auth params manually...");

    const token = crypto.randomUUID();

    const expire = Math.floor(Date.now() / 1000) + 30 * 60;

    const signatureString = token + expire;
    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(signatureString)
      .digest("hex");

    console.log("✅ Auth params generated:", {
      token,
      expire,
      hasSignature: !!signature,
      publicKey: publicKey.substring(0, 10) + "...",
    });

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error: any) {
    console.error("❌ ImageKit auth error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate authentication parameters",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
