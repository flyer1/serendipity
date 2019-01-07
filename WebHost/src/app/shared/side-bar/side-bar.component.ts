import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SideBarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
