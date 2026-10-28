"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { Pokemon, RespostaUma } from "@/types/pokemon";
import { pegarFavoritos, alternarFavorito } from "@/lib/favorites";

export default function DetalhePage() {
  const params = useParams<{ id: string }>();
  const [carta, setCarta] = useState<Pokemon | null>(null);
  const [favorita, setFavorita] = useState(false);

  useEffect(() => {
    async function carregar() {
      const resposta = await fetch(`https://api.pokemontcg.io/v2/cards/${params.id}`);
      const json: RespostaUma = await resposta.json();
      setCarta(json.data);
      setFavorita(pegarFavoritos().some((c) => c.id === json.data.id));
    }
    carregar();
  }, [params.id]);

  function favoritar() {
    if (!carta) return;
    const nova = alternarFavorito(carta);
    setFavorita(nova.some((c) => c.id === carta.id));
  }

  return (
    <>
      <Header />
      <main className="conteudo">
        <Link href="/cards">← Voltar</Link>
        {!carta && <p>Carregando...</p>}
        {carta && (
          <div className="detalhe">
            <Image src={carta.images.large} alt={carta.name} width={367} height={512} />
            <div>
              <h2>{carta.name}</h2>
              <p>Categoria: {carta.supertype}</p>
              <p>HP: {carta.hp ?? "-"}</p>
              <p>Tipos: {carta.types?.join(", ") ?? "-"}</p>
              <p>Raridade: {carta.rarity ?? "-"}</p>
              <p>Artista: {carta.artist ?? "-"}</p>
              <p>Coleção: {carta.set.name} ({carta.set.series})</p>
              <button onClick={favoritar}>
                {favorita ? "Remover favorito" : "Favoritar"}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
