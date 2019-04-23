export interface MetagameResponse {
  numberOfTotalDecks: number;
  metagameOverview: Overview;
  timestamp: string;
  deckDataArray: Deck[];
}

export interface Deck {
  name: string;
  numberOfDeck: number;
  percentageOfMetagame: number;
  archetype: string;
}

export interface MetagameData {
  name: string;
  numberOfDeck: number;
  percentageOfMetagame?: number;
}

export interface Overview {
  aggro: string;
  control: string;
  combo: string;
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}