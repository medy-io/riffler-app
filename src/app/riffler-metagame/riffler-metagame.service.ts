import { Injectable } from '@angular/core';
import { RifflerMetagameProxy } from './riffler-metagame.proxy';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MetagameResponse } from './riffler-metagame.component.model';

@Injectable()
export class RifflerMetagameService {

    constructor(private RifflerMetagameProxy: RifflerMetagameProxy) { }
    cardObjectArray: any[] = [];
    card: Observable<any>;
    private subby = new Subject<any>();
    private hubby = new Subject<any>();
    private scryFallRetrievalError = new Subject<any>();
    subby$ = this.subby;
    hubby$ = this.hubby.asObservable();
    scryFallRetrievalError$ = this.scryFallRetrievalError.asObservable();

    // return JSON from proxy to component
    getDeckData(format: string): Observable<MetagameResponse> {
        return this.RifflerMetagameProxy.getMetagameDataLegacy(format);
    }

}
