import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKudos } from 'app/shared/model/kudos.model';

@Component({
    selector: 'jhi-kudos-detail',
    templateUrl: './kudos-detail.component.html'
})
export class KudosDetailComponent implements OnInit {
    kudos: IKudos;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kudos }) => {
            this.kudos = kudos;
        });
    }

    previousState() {
        window.history.back();
    }
}
