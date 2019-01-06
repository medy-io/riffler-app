export interface Card {
    name: string;
    type: number;
    image: string;
}

export interface DeckProbabilityContext {
    cardGroupId?: number;
    cardAmount?: number;
    deckCardCount?: number;
    subPopSize?: number;
    sampleSize?: number;
    xValue?: number;
    result?: number[];
}

export interface CardsResponse {
    cards: Card[];
}

export interface CardItem {
    name: string;
    names: string[];
    manaCost: string;
    cmc: number;
    colors: string[];
    colorIdentity: string[];
    type: string;
    supertypes: string[];
    types: string[];
    subtypes: string[];
    rarity: string;
    set?: string;
    text?: string;
    artist?: string;
    number?: string;
    power: string;
    toughness: string;
    layout?: string;
    multiverseid: string;
    imageUrl: string;
}

export interface CardRequest {
    identifiers: CardName[];
}

export interface CardName {
    name: string;
}
