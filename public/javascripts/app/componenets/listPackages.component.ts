import {Component, Input} from '@angular/core';


@Component({
    selector: 'list-packages',
    template: `<ul>
                    <li class="active-package-item top15" *ngFor="let package of packages">
                        <div><span class="active-package-item-field">Name</span>{{package.name}}</div>
                        <div *ngIf="package.balance > 0"><span class="active-package-item-field">Balance</span>&#36;{{package.balance}}</div>
                        <div *ngIf="package.remainingMinutes > 0"><span class="active-package-item-field">Remaining Time</span>{{package.remainingMinutes}} minutes</div>
                        <div><span class="active-package-item-field">Start Time</span>{{package.startTime | date: 'dd/MM/yyyy HH:mm'}}</div>
                        <div><span class="active-package-item-field">End Time</span>{{package.endTime | date: 'dd/MM/yyyy HH:mm'}}</div>
                    </li>
                </ul>`,
    inputs: ['packages']
})

export class ListPackagesComponent {
    packages = [];
}