import { Component, EventEmitter, Output, Pipe, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin'
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { RifflerMetagameService } from './riffler-metagame.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Deck, MetagameResponse, MetagameData, Element } from './riffler-metagame.component.model';
import { a } from '@angular/core/src/render3';
import { Chart } from 'chart.js';
import { pipeDef } from '@angular/core/src/view';

@Component({
    selector: 'riffler-metagame',
    templateUrl: './riffler-metagame.component.html',
    styleUrls: ['./riffler-metagame.component.css']
})
export class RifflerMetagameComponent implements OnInit {
    displayedColumns: string[] = [];
    formats = [
        { value: 'LE', viewValue: 'Legacy' }
    ];
    metagameData: Deck[] = [];
    val: any;
    timestamp: string = '';
    chart = [];
    aggro_Chart = [];
    @ViewChild('canvas') canvas: ElementRef;
    context: CanvasRenderingContext2D;
    @ViewChild('aggroChart') aggroChart: ElementRef;
    contextAggro: CanvasRenderingContext2D;


    constructor(private rifflerMetagameService: RifflerMetagameService,
        public matSnackBar: MatSnackBar,
    ) {
        this.displayedColumns = ['name', 'numberOfDeck', 'percentageOfMetagame', 'archetype'];
    }

    ngOnInit() {
        this.fetchFormatMetagameData(this.formats[0].value);
    }

    public fetchFormatMetagameData(format: any): void {
        this.rifflerMetagameService.getDeckData(format).subscribe(val => {
            this.timestamp = val.timestamp;
            this.metagameData = val.deckDataArray;
            this.metagameData.sort((a, b) => b.numberOfDeck - a.numberOfDeck);
            this.initMetagameCharts(val);
        });
    }

    initMetagameCharts(val: MetagameResponse) {
        this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
        this.chart = new Chart(this.context, {
            type: 'doughnut',
            data: {
                labels: ['Aggro', 'Control', 'Combo'],
                datasets: [
                    {
                        label: 'Overall Metagme',
                        data: [val.metagameOverview.aggro, val.metagameOverview.control, val.metagameOverview.combo],
                        backgroundColor: [
                            '#2196F3',
                            '#FFC107',
                            '#4CAF50'
                        ]
                    }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: '#212121',
                        fontSize: 18,
                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        padding: 20
                    }
                }
            }
        });
    }



}
