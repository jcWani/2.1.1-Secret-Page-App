import { type NextRequest } from "next/server";
import { updateSession } from "@/server/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/",
    "/protected/secret-page-1",
    "/protected/secret-page-2",
    "/protected/secret-page-3",
  ],
};
