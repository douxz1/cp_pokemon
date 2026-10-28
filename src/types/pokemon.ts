// Tipos do retorno da API do Pokémon TCG
export interface Pokemon {
  id: string;
  name: string;
  hp?: string;
  types?: string[];
  rarity?: string;
  artist?: string;
  supertype: string;
  nationalPokedexNumbers?: number[];
  images: {
    small: string;
    large: string;
  };
  set: {
    name: string;
    series: string;
  };
}

export interface RespostaLista {
  data: Pokemon[];
}

export interface RespostaUma {
  data: Pokemon;
}
