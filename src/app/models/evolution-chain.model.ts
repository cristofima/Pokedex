export interface EvolutionChainDetails {
    speciesName: string;
    minLevel?: number;
    triggerName?: any;
    item?: any;
    pokemonIndex: number;
}

export interface EvolutionChain {
    id: number;
    chain: Chain;
}

export interface Chain {
    evolution_details: any[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: Species;
}

export interface EvolutionDetail {
    item?: Item;
}

export interface Species {
    name: string;
    url: string;
}

export interface EvolvesTo {
    evolution_details: EvolutionDetail[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: Species;
}

export interface Item {
    name: string;
}