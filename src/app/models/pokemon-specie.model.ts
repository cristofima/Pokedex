export interface PokemonSpecie {
    evolution_chain: { url: string };
    generation: Generation;
    shape: { name: string };
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    habitat: { name: string };
}

export interface Generation {
    name: string;
    url: string;
    numeral: number;
}