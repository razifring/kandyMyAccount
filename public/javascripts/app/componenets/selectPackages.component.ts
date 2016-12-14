import {Component, EventEmitter, Output, Input} from '@angular/core';


@Component({
    selector: 'select-package',
    template: ` <div class="row" *ngFor="let package of packages">
                <div class="select-packages row"  >
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <div class="select-package-item" [class.active]="selected==package.id">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="package-name">{{package.title}}</div>       
                                </div>
                                <div class="package-price col-xs-5 col-sm-5 col-md-5 col-lg-5 package-cost">{{package.cost | currency:'USD':true }}</div>
                                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 buy-button" (click)="packageSelected(package.id)" >
                                    
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <small class="text-muted package-description">{{package.description}}</small>
                </div>
                </div>
                `,
    inputs: ['packages', 'selected']
})

export class SelectPackagesComponent {
    packages = [];
    @Output() onSelect = new EventEmitter();ios
    selected;

    constructor() {}

    public packageSelected(packageId){
        this.onSelect.emit(packageId)
    }
}