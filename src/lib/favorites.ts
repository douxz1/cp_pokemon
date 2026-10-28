import { Pokemon } from "@/types/pokemon";

const CHAVE = "favoritos";

// Le os favoritos salvos no localStorage
export function pegarFavoritos(): Pokemon[] {
  const texto = localStorage.getItem(CHAVE);
  if (!texto) return [];
  return JSON.parse(texto);
}

// Salva a lista de favoritos no localStorage
export function salvarFavoritos(lista: Pokemon[]) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

// Se a carta ja e favorita remove, se nao for adiciona
export function alternarFavorito(carta: Pokemon): Pokemon[] {
  const lista = pegarFavoritos();
  const existe = lista.some((c) => c.id === carta.id);
  const nova = existe ? lista.filter((c) => c.id !== carta.id) : [...lista, carta];
  salvarFavoritos(nova);
  return nova;
}

export function limparFavoritos() {
  localStorage.removeItem(CHAVE);
}
