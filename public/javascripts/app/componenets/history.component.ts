import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {PackagesService} from '../services/packages.service';
import {HistoryService} from "../services/history.service";

@Component({
    templateUrl: 'templates/history.html',
    providers: [PackagesService]
})

export class HistoryComponent implements OnInit{

    public type = 'payments';
    public startDate;
    public endDate;
    public todayDate;
    public processing:boolean = false;
    public history;

    constructor( private historyService: HistoryService){
        let todayDate = new Date();
        this.endDate = this.todayDate = todayDate.toISOString().substring(0,10);
        let lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth()-1);
        this.startDate = lastMonth.toISOString().substring(0,10);
    }

    ngOnInit(): void {

    }

    searchHistory() {
        this.processing = true;
        console.log(this.startDate);
        console.log(this.endDate);
        console.log(this.type);

        let start = this.startDate;
        let end = this.endDate;

        if(_.isObject(start)){
            start = start.toISOString().substring(0,10);
        }

        if(_.isObject(end)){
            end = end.toISOString().substring(0,10);
        }


        this.historyService.getHistory(this.type, start, end)
            .subscribe(
                res => {
                    this.processing = false;
                    this.history = res;
                    console.log(res);
                }
            );
    }

}