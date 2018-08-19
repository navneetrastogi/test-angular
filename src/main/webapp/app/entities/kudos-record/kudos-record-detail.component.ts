import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKudosRecord } from 'app/shared/model/kudos-record.model';

@Component({
    selector: 'jhi-kudos-record-detail',
    templateUrl: './kudos-record-detail.component.html'
})
export class KudosRecordDetailComponent implements OnInit {
    kudosRecord: IKudosRecord;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kudosRecord }) => {
            this.kudosRecord = kudosRecord;
        });
    }

    previousState() {
        window.history.back();
    }
}
