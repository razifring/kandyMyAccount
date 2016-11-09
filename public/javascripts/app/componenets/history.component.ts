import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {PackagesService} from '../services/packages.service';
import {HistoryService} from "../services/history.service";

@Component({
    templateUrl: 'templates/history.html',
    providers: [PackagesService]
})

export class HistoryComponent implements OnInit{

    public type = 'packages';
    public startDate;
    public endDate;
    public todayDate;
    public processing:boolean = false;
    public callHistory;
    public smsHistory;
    public packagesHistory;

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

        let start = this.startDate;
        let end = this.endDate + ' 23:59:59';


        this.historyService.getHistory(this.type, start, end)
            .subscribe(
                res => {
                    this.packagesHistory = this.callHistory = this.smsHistory = '';
                    
                    if(this.type === 'calls') {
                        this.callHistory = res.body.history;
                    } else if( this.type === 'sms'){
                        this.smsHistory = res.body.history;
                    } else if(this.type === 'packages'){
                        this.packagesHistory = res.body.history;
                    }

                    this.processing = false;
                    console.log(res);
                }
            );
    }

}