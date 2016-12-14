import {Component, Input} from '@angular/core';


@Component({
    selector: 'list-packages',
    template: `
                    <li class="active-package-item top15" *ngFor="let package of packages" >
                        <div class="row">
                            <div class="col-sm-3 call-icon"></div>
                            <div class="col-sm-9">
                                <div class="enrolled-package-name">{{package.name}}</div>
                                <div class="enrolled-package-date">{{package.endTime | date: 'dd/MM/yyyy HH:mm'}}</div>
                            </div>
        
                        </div>
        
                    </li> 
                    <!--
                    <ul>
                    <li class="active-package-item top15" *ngFor="let package of packages">
                        <div><span class="active-package-item-field">Name</span>{{package.name}}</div>
                       <!-- <div *ngIf="package.balance > 0"><span class="active-package-item-field">Balance</span>&#36;{{package.balance}}</div>
                        <div *ngIf="package.remainingMinutes > 0"><span class="active-package-item-field">Remaining Time</span>{{package.remainingMinutes}} minutes</div>
                        <div><span class="active-package-item-field">Start Time</span>{{package.startTime | date: 'dd/MM/yyyy HH:mm'}}</div>
                        <div><span class="active-package-item-field">End Time</span>{{package.endTime | date: 'dd/MM/yyyy HH:mm'}}</div>
                    </li>
                    </ul>-->
                `,
    inputs: ['packages']
})

export class ListPackagesComponent {
    packages = [];
}