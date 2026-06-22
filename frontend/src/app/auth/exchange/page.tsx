"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function ExchangeHandler() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const next = searchParams.get("next") ?? "/mike/assistant";

        if (!code) {
            window.location.replace("/mike/login?error=no_code");
            return;
        }

        supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
            if (error) {
                window.location.replace(
                    `/mike/login?error=${encodeURIComponent(error.message)}`
                );
            } else {
                window.location.replace(next);
            }
        });
    }, []);

    return (
        <div className="flex min-h-dvh items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
        </div>
    );
}

export default function AuthExchangePage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-dvh items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
                </div>
            }
        >
            <ExchangeHandler />
        </Suspense>
    );
}
