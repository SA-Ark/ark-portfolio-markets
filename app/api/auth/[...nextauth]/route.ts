import { handlers } from "@/auth";
import type { NextRequest } from "next/server";

type AuthContext = { params: Promise<{ nextauth: string[] }> };
type AuthRouteHandler = (request: NextRequest, context: AuthContext) => Response | Promise<Response>;

const getHandler = handlers.GET as unknown as AuthRouteHandler;
const postHandler = handlers.POST as unknown as AuthRouteHandler;

export function GET(request: NextRequest, context: AuthContext) {
  return getHandler(request, context);
}

export function POST(request: NextRequest, context: AuthContext) {
  return postHandler(request, context);
}
