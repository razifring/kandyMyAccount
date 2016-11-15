import {Component, EventEmitter, Output, Input} from '@angular/core';


@Component({
    selector: 'select-package',
    template: ` <div>Select a package:</div>
                <ul class="select-packages">
                    <li [class.active]="selected==package.id" class="row select-package-item" (click)="packageSelected(package.id)" *ngFor="let package of packages">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="package-name col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    {{package.title}}
                                </div>    
                            </div>                      
                            <div class="row">
                                <div class="package-price col-xs-5 col-sm-4 col-md-3 col-lg-2">{{package.cost}}</div>
                                <div class=" col-xs-7 col-sm-8 col-md-9 col-lg-10">
                                    <small class="text-muted package-description">{{package.description}}</small>
                                </div>
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