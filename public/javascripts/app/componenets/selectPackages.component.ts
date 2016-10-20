import {Component, EventEmitter, Output, Input} from '@angular/core';


@Component({
    selector: 'select-package',
    template: ` <div>Select a package:</div>
                <ul class="select-packages">
                    <li [class.active]="selected==package.id" class="col-md-8 select-package-item" (click)="packageSelected(package.id)" *ngFor="let package of packages">
                        <div class="package-price col-md-3">US{{package.cost | currency:'USD':true:'.2-2'}}</div>
                        <div class="package-name col-md-6">{{package.name}}</div>
                    </li>
                </ul>`,
    inputs: ['packages', 'selected']
})

export class SelectPackagesComponent {
    packages = [];
    @Output() onSelect = new EventEmitter();
    selected;

    constructor() {}

    public packageSelected(packageId){
        this.onSelect.emit(packageId)
    }
}