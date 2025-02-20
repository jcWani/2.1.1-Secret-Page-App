import { type NextRequest } from "next/server";
import { updateSession } from "@/server/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/", "/secret-page-1", "/secret-page-2", "/secret-page-3"],
};
