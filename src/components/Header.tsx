"use client";

import { useRouter } from "next/navigation";
import { limparFavoritos } from "@/lib/favorites";

export default function Header() {
  const router = useRouter();

  async function sair() {
    await fetch("/api/login", { method: "DELETE" });
    limparFavoritos(); // ao deslogar, limpa os favoritos
    router.push("/login");
  }

  return (
    <header className="topo">
      <h1>Minhas cartas favoritas</h1>
      <button onClick={sair}>Sair</button>
    </header>
  );
}
