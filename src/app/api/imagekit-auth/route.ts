// app/api/imagekit-auth/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    // Verify environment variables exist
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

    // Generate token (UUID v4)
    const token = crypto.randomUUID();

    // Generate expire (Unix timestamp in seconds, 30 minutes from now)
    const expire = Math.floor(Date.now() / 1000) + 30 * 60;

    console.log("📅 Expire timestamp:", {
      expire,
      currentTime: Math.floor(Date.now() / 1000),
      difference: expire - Math.floor(Date.now() / 1000),
      expiresInMinutes: (expire - Math.floor(Date.now() / 1000)) / 60,
    });

    // Generate signature: HMAC-SHA1 of (token + expire)
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

    // Return the auth params
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

// For Pages Router, use this instead:
// pages/api/imagekit-auth.ts
/*
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      return res.status(500).json({ 
        error: "ImageKit not configured" 
      });
    }

    // Generate token
    const token = crypto.randomUUID();
    
    // Generate expire (Unix timestamp in seconds, 30 minutes from now)
    const expire = Math.floor(Date.now() / 1000) + (30 * 60);
    
    // Generate signature
    const signatureString = token + expire;
    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(signatureString)
      .digest("hex");

    res.status(200).json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error: any) {
    console.error("ImageKit auth error:", error);
    res.status(500).json({ 
      error: "Failed to generate authentication parameters",
      details: error.message
    });
  }
}
*/
