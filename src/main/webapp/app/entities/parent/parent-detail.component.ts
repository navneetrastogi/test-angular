import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParent } from 'app/shared/model/parent.model';

@Component({
    selector: 'jhi-parent-detail',
    templateUrl: './parent-detail.component.html'
})
export class ParentDetailComponent implements OnInit {
    parent: IParent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parent }) => {
            this.parent = parent;
        });
    }

    previousState() {
        window.history.back();
    }
}
