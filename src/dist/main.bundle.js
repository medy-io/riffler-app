webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"loader\" *ngIf=\"testMtgDeck.length === 0 && loadingData\">\r\n  <mat-spinner [color]=\"primary\" [mode]=\"indeterminate\"></mat-spinner>\r\n</div>\r\n\r\n<mat-toolbar class=\"toolbar\">\r\n  <img src=\"./assets/logo.png\" height=\"25\" width=\"25\">\r\n  <h1 class=\"toolbar-text\">{{title}}</h1>\r\n</mat-toolbar>\r\n\r\n<header class=\"app-header\">\r\n  <div>\r\n    <h1>Welcome to Riffler!</h1>\r\n    <h5>An app to simulate Magic: The Gathering&#174; decks. <br>To get started, type a list below and click submit.</h5>\r\n    <i class=\"fa fa-chevron-down fa-4x\" aria-hidden=\"true\"></i>\r\n    <div class=\"credit\">\r\n      <p><b>Art Credit: Mitchell Malloy + Wizards of the Coast</b></p>\r\n    </div>\r\n  </div>\r\n</header>\r\n\r\n<div class=\"app-wrapper\">\r\n\r\n  <h2 class=\"deckListHere\">Type your deck list:</h2>\r\n  <div class=\"deck-list-container\">\r\n    <!-- DECK LIST INPUT -->\r\n    <form class=\"deck-form\">\r\n      <mat-form-field>\r\n        <textarea type=\"text\" name=\"deck-list\" class=\"deck-list\" matInput placeholder=\"1 Cancel\" [(ngModel)]=\"deckDataInput\"></textarea>\r\n      </mat-form-field>\r\n    </form>\r\n    <!-- SUBMIT DECKLIST -->\r\n    <button mat-button (click)=\"getDeckData()\">Submit</button>\r\n  </div>\r\n\r\n\r\n\r\n  <div *ngIf=\"testMtgDeck && testMtgDeck.length > 0\">\r\n    <div class=\"button-row\">\r\n      <!-- RESET DECK, HAND AND CARDS DRAWN -->\r\n      <button mat-raised-button=\"\" class=\"mat-raised-button\" (click)=\"resetSim()\">\r\n        <span class=\"mat-button-wrapper\">Reset</span>\r\n      </button>\r\n      <!-- DRAW OPENING HAND -->\r\n      <button mat-raised-button=\"\" class=\"mat-raised-button\" (click)=\"drawOpeningHand()\">\r\n        <span class=\"mat-button-wrapper\">Draw Opening Hand</span>\r\n      </button>\r\n      <!-- MULLIGAN -->\r\n      <button mat-raised-button=\"\" class=\"mat-raised-button\" (click)=\"mulligan()\">\r\n        <span class=\"mat-button-wrapper\">Mulligan</span>\r\n      </button>\r\n      <!-- DRAW -->\r\n      <button mat-raised-button=\"\" class=\"mat-raised-button\" (click)=\"drawCard()\" [disabled]=\"testMtgDeck.length <= 0\">\r\n        <span class=\"mat-button-wrapper\">Draw a Card</span>\r\n      </button>\r\n    </div>\r\n    <!-- NUMBER OF CARDS IN OPENING HAND -->\r\n    <h2 class=\"section-headers\">Hand: {{mtgHand.length}}</h2>\r\n    <div class=\"hand-row\">\r\n      <!-- CARDS IN OPENING HAND -->\r\n      <mat-card class=\"card-card\" *ngFor=\"let hand of mtgHand\">\r\n        <img mat-card-image class=\"hand-card-img\" src={{hand.image_uris.normal}}>\r\n      </mat-card>\r\n    </div>\r\n    <!-- NUMBER OF CARDS DRAWN -->\r\n    <h2 class=\"section-headers\">Cards Drawn: {{mtgDrawnCards.length}}</h2>\r\n    <div class=\"hand-row\">\r\n      <!-- CARDS DRAWN -->\r\n      <mat-card class=\"card-card\" *ngFor=\"let drawnCard of mtgDrawnCards\">\r\n        <img mat-card-image class=\"hand-card-img\" src={{drawnCard.image_uris.normal}}>\r\n      </mat-card>\r\n    </div>\r\n    <!-- NUMBER OF CARDS LEFT IN DECK -->\r\n    <h2 class=\"section-headers\">Deck List: {{testMtgDeck.length}}</h2>\r\n    <div class=\"hand-row\">\r\n      <!-- CARDS IN DECK -->\r\n      <mat-card class=\"card-card\" *ngFor=\"let deck of testMtgDeck\">\r\n        <img mat-card-image class=\"hand-card-img\" src={{deck.image_uris.normal}}>\r\n        {{deck.percentageToDraw}}\r\n      </mat-card>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hyper_geometric_calc_service__ = __webpack_require__("../../../../../src/app/hyper-geometric-calc.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let AppComponent = class AppComponent {
    constructor(appService, hyperGeometricCalcService) {
        this.appService = appService;
        this.hyperGeometricCalcService = hyperGeometricCalcService;
        this.title = 'Riffler';
        // drawn cards list
        this.mtgDrawnCards = [];
        // deck list
        // testtestMtgDeck: Card[] = [];
        // opening hand
        this.mtgHand = [];
        this.testMtgDeck = [];
        // default mulligan number
        this.mull = 6;
        // experiment deck
        this.controlDeck = [];
        // experiment hand
        this.controlHand = [];
        this.textPlaceHolder = `1 Cancel \n 1 Ponder \n 1 Unsummon`;
        this.deckDataInput = '';
        this.loadingData = false;
    }
    getDeckData() {
        this.loadingData = true;
        this.appService.getDeckData(this.deckDataInput).subscribe(resp => {
            console.log(resp.data);
            this.testMtgDeck = resp.data;
        });
    }
    // draw your opening hand
    drawOpeningHand() {
        this.resetSim();
        if (this.mtgHand && this.mtgHand.length > 0) {
            for (let i = 0; i < 7; i++) {
                const card = this.mtgHand.shift();
                this.testMtgDeck.push(card);
            }
            for (let i = 0; i < 7; i++) {
                const index = (Math.floor(Math.random() * this.testMtgDeck.length));
                const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
                this.mtgHand.push(card[0]);
            }
        }
        else {
            for (let i = 0; i < 7; i++) {
                const index = (Math.floor(Math.random() * this.testMtgDeck.length));
                const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
                this.mtgHand.push(card[0]);
            }
        }
    }
    // clear opening hand and drawn cards
    resetSim() {
        if (this.mtgDrawnCards && this.mtgDrawnCards.length > 0) {
            this.testMtgDeck = this.testMtgDeck.concat(this.mtgDrawnCards);
            this.mtgDrawnCards = [];
        }
        if (this.mtgHand && this.mtgHand.length > 0) {
            this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
            this.mtgHand = [];
        }
        this.mull = 6;
    }
    drawCard() {
        // TODO: implement hypergeometric calculations for each card left in the deck
        // this.calculateEachCardDrawPercentage();
        const index = (Math.floor(Math.random() * this.testMtgDeck.length));
        const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
        this.mtgDrawnCards.push(card[0]);
    }
    mulligan() {
        if (this.mull === 0) {
            this.mull = 6;
        }
        this.testMtgDeck = this.testMtgDeck.concat(this.mtgHand);
        this.mtgHand = [];
        for (let i = 0; i < this.mull; i++) {
            const index = (Math.floor(Math.random() * this.testMtgDeck.length));
            const card = this.testMtgDeck.splice((Math.floor(Math.random() * this.testMtgDeck.length)), 1);
            this.mtgHand.push(card[0]);
        }
        this.mull--;
    }
    calculateEachCardDrawPercentage() {
        let deckCount;
        if (this.testMtgDeck.length <= 53 && this.testMtgDeck.length !== 0) {
            deckCount = this.testMtgDeck.length;
            console.log(deckCount);
            this.testMtgDeck.forEach(card => {
                card.percentageToDraw = this.hyperGeometricCalcService.calcHypGeo(deckCount--);
            });
        }
    }
};
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__hyper_geometric_calc_service__["a" /* HyperGeometricCalcService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__hyper_geometric_calc_service__["a" /* HyperGeometricCalcService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_toolbar__ = __webpack_require__("../../../material/esm5/toolbar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_card__ = __webpack_require__("../../../material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material_button__ = __webpack_require__("../../../material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_tabs__ = __webpack_require__("../../../material/esm5/tabs.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_expansion__ = __webpack_require__("../../../material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_input__ = __webpack_require__("../../../material/esm5/input.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_menu__ = __webpack_require__("../../../material/esm5/menu.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_material_form_field__ = __webpack_require__("../../../material/esm5/form-field.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_progress_spinner__ = __webpack_require__("../../../material/esm5/progress-spinner.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__hyper_geometric_calc_service__ = __webpack_require__("../../../../../src/app/hyper-geometric-calc.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_proxy__ = __webpack_require__("../../../../../src/app/app.proxy.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_12__angular_material_progress_spinner__["a" /* MatProgressSpinnerModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_material_form_field__["b" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_material_menu__["a" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material_button__["a" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material_toolbar__["a" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material_card__["a" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material_tabs__["a" /* MatTabsModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material_expansion__["a" /* MatExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_material_input__["a" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_14__angular_forms__["b" /* FormsModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_15__app_proxy__["a" /* AppProxy */], __WEBPACK_IMPORTED_MODULE_16__app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_13__hyper_geometric_calc_service__["a" /* HyperGeometricCalcService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_17__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.proxy.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppProxy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let AppProxy = class AppProxy {
    constructor(http) {
        this.http = http;
        this.API_URL = 'https://api.scryfall.com/';
        this.CARD_URL = 'cards/named?exact=';
        this.COLLECTION_URL = 'cards/collection';
        this.DECKLIST_URL = this.API_URL + this.COLLECTION_URL;
    }
    getDeckList(deckListRequest) {
        return this.http.post(this.DECKLIST_URL, deckListRequest)
            .map((res) => res.json());
    }
};
AppProxy = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], AppProxy);

var _a;
//# sourceMappingURL=app.proxy.js.map

/***/ }),

/***/ "../../../../../src/app/app.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_proxy__ = __webpack_require__("../../../../../src/app/app.proxy.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let AppService = class AppService {
    constructor(appProxy) {
        this.appProxy = appProxy;
    }
    // return JSON from proxy to component
    getDeckData(data) {
        return this.appProxy.getDeckList(this.convertToRequest(data));
    }
    convertToRequest(data) {
        const cardArrayNumber = data.match(/\d+/g);
        let cardArrayName = data.split(/[\d]/);
        cardArrayName = cardArrayName.filter(val => val !== '');
        const cardRequest = {
            identifiers: []
        };
        cardArrayNumber.forEach((card, index) => {
            if (cardArrayName[index] !== '') {
                for (let i = 0; i < +cardArrayNumber[index]; i++) {
                    const cardObj = {
                        name: cardArrayName[index].substr(1)
                    };
                    cardRequest.identifiers.push(cardObj);
                }
            }
        });
        return cardRequest;
    }
};
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_proxy__["a" /* AppProxy */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_proxy__["a" /* AppProxy */]) === "function" && _a || Object])
], AppService);

var _a;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ "../../../../../src/app/hyper-geometric-calc.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HyperGeometricCalcService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let HyperGeometricCalcService = class HyperGeometricCalcService {
    constructor() {
        this.probabilityResults = [];
        this.drawResults = [];
    }
    calcHypGeo(deckCount) {
        if (deckCount) {
            for (let i = 1; i < 5; i++) {
                this.deckProbContext = {
                    deckCardCount: 53,
                    subPopSize: i,
                    sampleSize: 8,
                    xValue: 1 // odds of drawing at least 1
                };
                return this.compute();
            }
        }
    }
    compute() {
        const nn = Math.floor(this.deckProbContext.deckCardCount);
        const m = Math.floor(this.deckProbContext.subPopSize);
        const n = Math.floor(this.deckProbContext.sampleSize);
        const x = Math.floor(this.deckProbContext.xValue);
        let prob;
        if (n <= 0 || m <= 0 || nn <= 0) {
            alert('Parameters must be positive integers');
            prob = 0;
        }
        else if (m > nn || n > nn) {
            alert('m and n must be less than N');
            prob = 0;
        }
        else if (x < 0 || x < n + m - nn) {
            prob = 0;
        }
        else if (x >= n || x >= m) {
            prob = 1;
        }
        else {
            if (2 * m > nn) {
                if (2 * n > nn) {
                    prob = this.hyp(nn - m - n + x, nn - n, nn - m, nn);
                }
                else {
                    prob = 1 - this.hyp(n - x - 1, n, nn - m, nn);
                }
            }
            else if (2 * n > nn) {
                prob = 1 - this.hyp(m - x - 1, m, nn - n, nn);
            }
            else {
                prob = this.hyp(x, n, m, nn);
            }
        }
        prob = Math.round(prob * 100000) / 100000;
        if (!this.deckCount) {
            this.probabilityResults.push(prob);
        }
        else if (this.deckCount) {
            this.drawResults.push(prob);
        }
        return prob;
    }
    hyp(x, n, m, nn) {
        let nz, mz;
        // best to have n<m
        if (m < n) {
            nz = m;
            mz = n;
        }
        else {
            nz = n;
            mz = m;
        }
        let h = 1;
        let s = 1;
        let k = 0;
        let i = 0;
        while (i < x) {
            while (s > 1 && k < nz) {
                h = h * (1 - mz / (nn - k));
                s = s * (1 - mz / (nn - k));
                k = k + 1;
            }
            h = h * (nz - i) * (mz - i) / (i + 1) / (nn - nz - mz + i + 1);
            s = s + h;
            i = i + 1;
        }
        while (k < nz) {
            s = s * (1 - mz / (nn - k));
            k = k + 1;
        }
        return s;
    }
};
HyperGeometricCalcService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], HyperGeometricCalcService);

//# sourceMappingURL=hyper-geometric-calc.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const environment = {
    production: false
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(err => console.log(err));
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map