import { NextResponse } from "next/server";

// POST = fazer login (confere so a senha da variavel de ambiente)
export async function POST(req: Request) {
  const { senha } = await req.json();

  if (senha !== process.env.SENHA_APP) {
    return NextResponse.json({ erro: "Senha incorreta" }, { status: 401 });
  }

  const resposta = NextResponse.json({ ok: true });
  resposta.cookies.set("logado", "sim", { httpOnly: true, path: "/" });
  return resposta;
}

// DELETE = logout (apaga o cookie)
export async function DELETE() {
  const resposta = NextResponse.json({ ok: true });
  resposta.cookies.set("logado", "", { httpOnly: true, path: "/", maxAge: 0 });
  return resposta;
}
