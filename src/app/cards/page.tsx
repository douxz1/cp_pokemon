"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CardItem from "@/components/CardItem";
import { Pokemon, RespostaLista } from "@/types/pokemon";
import { pegarFavoritos, alternarFavorito } from "@/lib/favorites";

export default function CardsPage() {
  const [busca, setBusca] = useState("");
  const [cartas, setCartas] = useState<Pokemon[]>([]);
  const [favoritos, setFavoritos] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(false);

  // Busca as cartas na API (maximo 15)
  async function buscarCartas(texto: string) {
    setCarregando(true);
    let url = "https://api.pokemontcg.io/v2/cards?pageSize=15&page=1";
    if (texto) {
      url += `&q=name:${texto}*&orderBy=number,name`;
    }
    try {
      const resposta = await fetch(url);
      const json: RespostaLista = await resposta.json();
      setCartas(json.data);
    } catch {
      setCartas([]);
    }
    setCarregando(false);
  }

  // Quando abre a tela: carrega cartas e favoritos
  useEffect(() => {
    buscarCartas("");
    setFavoritos(pegarFavoritos());
  }, []);

  function pesquisar(e: React.FormEvent) {
    e.preventDefault();
    buscarCartas(busca);
  }

  function favoritar(carta: Pokemon) {
    setFavoritos(alternarFavorito(carta));
  }

  function ehFavorita(id: string) {
    return favoritos.some((c) => c.id === id);
  }

  return (
    <>
      <Header />
      <main className="conteudo">
        <form onSubmit={pesquisar} className="busca">
          <input
            placeholder="Buscar carta (ex: charizard)"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {carregando && <p>Carregando...</p>}

        <div className="lista">
          {cartas.map((c) => (
            <CardItem key={c.id} carta={c} favorita={ehFavorita(c.id)} aoFavoritar={favoritar} />
          ))}
        </div>

        <h2>Meus favoritos</h2>
        {favoritos.length === 0 && <p>Nenhuma carta favoritada.</p>}
        <div className="lista">
          {favoritos.map((c) => (
            <CardItem key={c.id} carta={c} favorita={true} aoFavoritar={favoritar} />
          ))}
        </div>
      </main>
    </>
  );
}
