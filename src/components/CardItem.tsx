import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";

interface Props {
  carta: Pokemon;
  favorita: boolean;
  aoFavoritar: (carta: Pokemon) => void;
}

export default function CardItem({ carta, favorita, aoFavoritar }: Props) {
  return (
    <div className="carta">
      <Link href={`/cards/${carta.id}`}>
        <Image src={carta.images.large} alt={carta.name} width={245} height={342} />
      </Link>
      <h3>{carta.name}</h3>
      <p>Número: {carta.nationalPokedexNumbers?.[0] ?? "-"}</p>
      <p>Tipos: {carta.types?.join(", ") ?? "-"}</p>
      <p>HP: {carta.hp ?? "-"}</p>
      <button onClick={() => aoFavoritar(carta)}>
        {favorita ? "Remover favorito" : "Favoritar"}
      </button>
    </div>
  );
}
