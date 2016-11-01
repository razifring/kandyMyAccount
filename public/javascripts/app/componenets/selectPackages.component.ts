import {Component, EventEmitter, Output, Input} from '@angular/core';


@Component({
    selector: 'select-package',
    template: ` <div>Select a package:</div>
                <ul class="select-packages">
                    <li [class.active]="selected==package.id" class="row select-package-item" (click)="packageSelected(package.id)" *ngFor="let package of packages">
                        <div class="col-md-12">                        
                            <div class="row">
                                <div class="package-price col-xs-3 col-md-2">{{package.cost}}</div>
                                <div class="package-name col-xs-9 col-md-10">{{package.title}}</div>
                            </div>
                            <div class="row">
                                <div class="package-price col-xs-3 col-md-2"></div>
                                <small class="text-muted col-xs-9 package-description col-md-10">{{package.description}}</small>
                            </div>
                        </div>
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