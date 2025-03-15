import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ["/login", "/signup", "/verifyemail"].includes(path);
    const token = request.cookies.get("token")?.value || "";

    // ✅ Allow public pages even if logged in
    if (isPublicPath) return NextResponse.next();

    // ✅ Redirect unauthenticated users only for protected routes
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Apply middleware only to protected pages
export const config = {
    matcher: ["/dashboard", "/profile"], // 🔥 Remove "/login" & "/signup" from matcher
};
