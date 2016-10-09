import {Component, Input} from '@angular/core';


@Component({
    selector: 'list-packages',
    template: `<ul>
                    <li *ngFor="let package of packages">
                        <div>Name: {{package.name}}</div>
                        <div>Usage: {{package.usage}}</div>
                    </li>
                </ul>`,
    inputs: ['packages']
})

export class ListPackagesComponent {
    packages = [];
}