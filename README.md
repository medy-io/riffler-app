## Welcome to Riffler!

An app to simulate Magic: The Gathering decks.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.1.

## Changing Decks

To change decks just add your list to the text area and click submit to get a full visual list of your deck. You can then simulate opening hands, draw cards and apply mulligans.

## Scryfall Card Data

This app uses Scryfall card data and images to display visual views of the users deck. 

### Endpoint:

POST https://api.scryfall.com/cards/collection
  
### Request format:

{
  "identifiers": [
    {
      "id": "683a5707-cddb-494d-9b41-51b4584ded69"
    },
    {
      "name": "Ancient Tomb"
    },
    {
      "set": "mrd",
      "collector_number": "150"
    }
  ]
}

### Response Format

HTTP 200 OK
Content-Type: application/json; charset=utf-8

{
  "object": "list",
  "not_found": [],
  "data": [
    {
      "object": "card",
      "id": "683a5707-cddb-494d-9b41-51b4584ded69",
      "oracle_id": "a698c9f5-325a-49f6-8902-eef09f4260c5",
      "multiverse_ids": [
        397736
      ],
      "mtgo_id": 57168,
      "mtgo_foil_id": 57169,
      "tcgplayer_id": 98895,
      "name": "Lodestone Golem",
      "lang": "en",
      "released_at": "2015-05-22",
      "uri": "https://api.scryfall.com/cards/683a5707-cddb-494d-9b41-51b4584ded69",
      "scryfall_uri": "https://scryfall.com/card/mm2/219/lodestone-golem?utm_source=api",
      "layout": "normal",
      "highres_image": true,
      "image_uris": {
        "small": "https://img.scryfall.com/cards/small/en/mm2/219.jpg?1531565667",
        "normal": "https://img.scryfall.com/cards/normal/en/mm2/219.jpg?1531565667",
        "large": "https://img.scryfall.com/cards/large/en/mm2/219.jpg?1531565667",
        "png": "https://img.scryfall.com/cards/png/en/mm2/219.png?1531565667",
        "art_crop": "https://img.scryfall.com/cards/art_crop/en/mm2/219.jpg?1531565667",
        "border_crop": "https://img.scryfall.com/cards/border_crop/en/mm2/219.jpg?1531565667"
      },
      "mana_cost": "{4}",
      "cmc": 4,
      "type_line": "Artifact Creature — Golem",
      "oracle_text": "Nonartifact spells cost {1} more to cast.",
      "power": "5",
      "toughness": "3",
      "colors": [],
      "color_identity": [],
      "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "frontier": "not_legal",
        "modern": "legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "restricted",
        "penny": "not_legal",
        "commander": "legal",
        "1v1": "legal",
        "duel": "legal",
        "brawl": "not_legal"
      },
      "games": [
        "mtgo",
        "paper"
      ],
      "reserved": false,
      "foil": true,
      "nonfoil": true,
      "oversized": false,
      "promo": false,
      "reprint": true,
      "set": "mm2",
      "set_name": "Modern Masters 2015",
      "set_uri": "https://api.scryfall.com/sets/28cac015-43df-4e88-90d0-95dcdd894834",
      "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Amm2&unique=prints",
      "scryfall_set_uri": "https://scryfall.com/sets/mm2?utm_source=api",
      "rulings_uri": "https://api.scryfall.com/cards/683a5707-cddb-494d-9b41-51b4584ded69/rulings",
      "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Aa698c9f5-325a-49f6-8902-eef09f4260c5&unique=prints",
      "collector_number": "219",
      "digital": false,
      "rarity": "rare",
      "flavor_text": "\"Somehow it warps the Æther. It brings a strange weight, a blockade in the flow of spellcraft.\" —Noyan Dar, Tazeem lullmage",
      "illustration_id": "1311e0dd-56ba-40af-b173-b06915182001",
      "artist": "Chris Rahn",
      "border_color": "black",
      "frame": "2015",
      "frame_effect": "",
      "full_art": false,
      "story_spotlight": false,
      "edhrec_rank": 2579,
      "usd": "0.80",
      "eur": "0.82",
      "tix": "0.02",
      "related_uris": {
        "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=397736",
        "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Lodestone+Golem&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
        "edhrec": "http://edhrec.com/route/?cc=Lodestone+Golem",
        "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Lodestone+Golem"
      },
      "purchase_uris": {
        "tcgplayer": "https://shop.tcgplayer.com/magic/modern-masters-2015/lodestone-golem?partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Modern-Masters-2015/Lodestone-Golem?referrer=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/57168?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
      }
    },
    {
      "object": "card",
      "id": "bd3d4b4b-cf31-4f89-8140-9650edb03c7b",
      "oracle_id": "23467047-6dba-4498-b783-1ebc4f74b8c2",
      "multiverse_ids": [
        456832
      ],
      "mtgo_id": 70055,
      "mtgo_foil_id": 70056,
      "tcgplayer_id": 179473,
      "name": "Ancient Tomb",
      "lang": "en",
      "released_at": "2018-12-07",
      "uri": "https://api.scryfall.com/cards/bd3d4b4b-cf31-4f89-8140-9650edb03c7b",
      "scryfall_uri": "https://scryfall.com/card/uma/236/ancient-tomb?utm_source=api",
      "layout": "normal",
      "highres_image": true,
      "image_uris": {
        "small": "https://img.scryfall.com/cards/small/front/b/d/bd3d4b4b-cf31-4f89-8140-9650edb03c7b.jpg?1545067798",
        "normal": "https://img.scryfall.com/cards/normal/front/b/d/bd3d4b4b-cf31-4f89-8140-9650edb03c7b.jpg?1545067798",
        "large": "https://img.scryfall.com/cards/large/front/b/d/bd3d4b4b-cf31-4f89-8140-9650edb03c7b.jpg?1545067798",
        "png": "https://img.scryfall.com/cards/png/front/b/d/bd3d4b4b-cf31-4f89-8140-9650edb03c7b.png?1545067798",
        "art_crop": "https://img.scryfall.com/cards/art_crop/front/b/d/bd3d4b4b-cf31-4f89-8140-9650edb03c7b.jpg?1545067798",
        "border_crop": "https://img.scryfall.com/cards/border_crop/front/b/d/bd3d4b4b-cf31-4f89-8140-9650edb03c7b.jpg?1545067798"
      },
      "mana_cost": "",
      "cmc": 0,
      "type_line": "Land",
      "oracle_text": "{T}: Add {C}{C}. Ancient Tomb deals 2 damage to you.",
      "colors": [],
      "color_identity": [],
      "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "frontier": "not_legal",
        "modern": "not_legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "legal",
        "penny": "not_legal",
        "commander": "legal",
        "1v1": "legal",
        "duel": "legal",
        "brawl": "not_legal"
      },
      "games": [
        "mtgo",
        "paper"
      ],
      "reserved": false,
      "foil": true,
      "nonfoil": true,
      "oversized": false,
      "promo": false,
      "reprint": true,
      "set": "uma",
      "set_name": "Ultimate Masters",
      "set_uri": "https://api.scryfall.com/sets/2ec77b94-6d47-4891-a480-5d0b4e5c9372",
      "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Auma&unique=prints",
      "scryfall_set_uri": "https://scryfall.com/sets/uma?utm_source=api",
      "rulings_uri": "https://api.scryfall.com/cards/bd3d4b4b-cf31-4f89-8140-9650edb03c7b/rulings",
      "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A23467047-6dba-4498-b783-1ebc4f74b8c2&unique=prints",
      "collector_number": "236",
      "digital": false,
      "rarity": "rare",
      "flavor_text": "There is no glory to be gained in the kingdom of the dead.\n—Vec tomb inscription",
      "illustration_id": "78ead55d-d345-4f7a-acc4-32036a9983bf",
      "artist": "Yeong-Hao Han",
      "border_color": "black",
      "frame": "2015",
      "frame_effect": "",
      "full_art": false,
      "story_spotlight": false,
      "edhrec_rank": 141,
      "usd": "19.88",
      "eur": "14.49",
      "related_uris": {
        "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=456832",
        "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Ancient+Tomb&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
        "edhrec": "http://edhrec.com/route/?cc=Ancient+Tomb",
        "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Ancient+Tomb"
      },
      "purchase_uris": {
        "tcgplayer": "https://shop.tcgplayer.com/magic/ultimate-masters/ancient-tomb?partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Ultimate-Masters/Ancient-Tomb?referrer=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/70055?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
      }
    },
    {
      "object": "card",
      "id": "1a02ca71-5e39-4a5f-aaba-a1e3e10a6a3e",
      "oracle_id": "74027ba4-a6ba-4696-baf1-60ef0b27ee0a",
      "multiverse_ids": [
        48326
      ],
      "mtgo_id": 19995,
      "mtgo_foil_id": 19996,
      "tcgplayer_id": 11465,
      "name": "Chalice of the Void",
      "lang": "en",
      "released_at": "2003-10-02",
      "uri": "https://api.scryfall.com/cards/1a02ca71-5e39-4a5f-aaba-a1e3e10a6a3e",
      "scryfall_uri": "https://scryfall.com/card/mrd/150/chalice-of-the-void?utm_source=api",
      "layout": "normal",
      "highres_image": true,
      "image_uris": {
        "small": "https://img.scryfall.com/cards/small/en/mrd/150.jpg?1517813031",
        "normal": "https://img.scryfall.com/cards/normal/en/mrd/150.jpg?1517813031",
        "large": "https://img.scryfall.com/cards/large/en/mrd/150.jpg?1517813031",
        "png": "https://img.scryfall.com/cards/png/en/mrd/150.png?1517813031",
        "art_crop": "https://img.scryfall.com/cards/art_crop/en/mrd/150.jpg?1517813031",
        "border_crop": "https://img.scryfall.com/cards/border_crop/en/mrd/150.jpg?1517813031"
      },
      "mana_cost": "{X}{X}",
      "cmc": 0,
      "type_line": "Artifact",
      "oracle_text": "Chalice of the Void enters the battlefield with X charge counters on it.\nWhenever a player casts a spell with converted mana cost equal to the number of charge counters on Chalice of the Void, counter that spell.",
      "colors": [],
      "color_identity": [],
      "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "frontier": "not_legal",
        "modern": "legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "restricted",
        "penny": "not_legal",
        "commander": "legal",
        "1v1": "legal",
        "duel": "legal",
        "brawl": "not_legal"
      },
      "games": [
        "mtgo",
        "paper"
      ],
      "reserved": false,
      "foil": true,
      "nonfoil": true,
      "oversized": false,
      "promo": false,
      "reprint": false,
      "set": "mrd",
      "set_name": "Mirrodin",
      "set_uri": "https://api.scryfall.com/sets/1d4f90ba-8d4a-4ee5-bc2f-e2d6bffe4955",
      "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Amrd&unique=prints",
      "scryfall_set_uri": "https://scryfall.com/sets/mrd?utm_source=api",
      "rulings_uri": "https://api.scryfall.com/cards/1a02ca71-5e39-4a5f-aaba-a1e3e10a6a3e/rulings",
      "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A74027ba4-a6ba-4696-baf1-60ef0b27ee0a&unique=prints",
      "collector_number": "150",
      "digital": false,
      "rarity": "rare",
      "illustration_id": "b51bb61e-bad7-46ca-abd0-c5322c43ecdb",
      "artist": "Mark Zug",
      "border_color": "black",
      "frame": "2003",
      "frame_effect": "",
      "full_art": false,
      "story_spotlight": false,
      "edhrec_rank": 7988,
      "usd": "39.20",
      "eur": "25.44",
      "tix": "16.36",
      "related_uris": {
        "gatherer": "http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=48326",
        "tcgplayer_decks": "https://decks.tcgplayer.com/magic/deck/search?contains=Chalice+of+the+Void&page=1&partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
        "edhrec": "http://edhrec.com/route/?cc=Chalice+of+the+Void",
        "mtgtop8": "http://mtgtop8.com/search?MD_check=1&SB_check=1&cards=Chalice+of+the+Void"
      },
      "purchase_uris": {
        "tcgplayer": "https://shop.tcgplayer.com/magic/mirrodin/chalice-of-the-void?partner=Scryfall&utm_campaign=affiliate&utm_medium=scryfall&utm_source=scryfall",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Mirrodin/Chalice-of-the-Void?referrer=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/19995?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
      }
    }
  ]
}

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `src/dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
