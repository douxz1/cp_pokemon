import { NextRequest, NextResponse } from "next/server";

// Se nao tiver o cookie de login, manda para a tela de login
export function middleware(req: NextRequest) {
  const logado = req.cookies.get("logado")?.value === "sim";
  if (!logado) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/cards/:path*"] };
