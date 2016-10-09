import {Component, EventEmitter, Output, Input} from '@angular/core';


@Component({
    selector: 'select-package',
    template: ` <div>Select a package:</div>
                <ul class="select-packages">
                    <li (click)="packageSelected(package.id)" *ngFor="let package of packages">
                        <div class="package-price">{{package.price}}</div>
                        <div class="package-name">{{package.name}}</div>
                    </li>
                </ul>`,
    inputs: ['packages']
})

export class SelectPackagesComponent {
    packages = [];
    @Output() selected = new EventEmitter();

    constructor() {}

    public packageSelected(packageId){
        this.selected.emit(packageId)
    }
}