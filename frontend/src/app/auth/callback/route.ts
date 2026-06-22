import { NextRequest, NextResponse } from "next/server";

// Hand off to the client-side exchange page so the browser can access
// the PKCE code verifier it stored locally during the OAuth initiation.
export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? origin;
    return NextResponse.redirect(`${appUrl}/mike/auth/exchange?${searchParams.toString()}`);
}
