import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/mike/assistant";

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? origin;

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${appUrl}${next}`);
        }
    }

    return NextResponse.redirect(`${appUrl}/mike/login?error=auth`);
}
