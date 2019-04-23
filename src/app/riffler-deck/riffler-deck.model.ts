// main card object: holds all relevant card data, object structure comes from "https://scryfall.com/docs/api"
export interface CardObject {
    object: string;
    id: string;
    oracle_id: string;
    multiverse_ids: number[];
    mtgo_id: number;
    mtgo_foil_id: number;
    tcgplayer_id: number;
    name: string;
    lang: string;
    released_at: string;
    uri: string;
    scryfall_uri: string;
    layout: string;
    highres_image: boolean;
    image_uris: ImageUri;
    mana_cost: string;
    cmc: number;
    type_line: string;
    oracle_text: string;
    power: string;
    toughness: string;
    colors: any[];
    color_identity: any[];
    legalities: Legalities;
    games: string[];
    reserved: boolean;
    foil: boolean;
    nonfoil: boolean;
    oversized: boolean;
    promo: boolean;
    reprint: boolean;
    set: string;
    set_name: string;
    set_uri: string;
    set_search_uri: string;
    scryfall_set_uri: string;
    rulings_uri: string;
    prints_search_uri: string;
    collector_number: string;
    digital: boolean;
    rarity: string;
    flavor_text: string;
    illustration_id: string;
    artist: string;
    border_color: string;
    frame: string;
    frame_effect: string;
    full_art: boolean;
    story_spotlight: boolean;
    edhrec_rank: number;
    usd: string;
    eur: string;
    tix: string;
    percentageToDraw?: number;
    numberOfInDeck?: number;
}
// imageUri object: handles links to card images
export interface ImageUri {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
}
// format Legalities object: shows which cards are legal in different formats
export interface Legalities {
    standard: string;
    future: string;
    frontier: string;
    modern: string;
    legacy: string;
    pauper: string;
    vintage: string;
    penny: string;
    commander: string;
    c1vc1: string;
    duel: string;
    brawl: string;
}

export interface SwitcherList {
    value: string;
    viewValue: string;
}

export interface PercentByCardType {
    name: string;
    numberOfInDeck: number;
    percentageToDraw: number;

}