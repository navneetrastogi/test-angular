import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIllnessRecord } from 'app/shared/model/illness-record.model';

@Component({
    selector: 'jhi-illness-record-detail',
    templateUrl: './illness-record-detail.component.html'
})
export class IllnessRecordDetailComponent implements OnInit {
    illnessRecord: IIllnessRecord;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ illnessRecord }) => {
            this.illnessRecord = illnessRecord;
        });
    }

    previousState() {
        window.history.back();
    }
}
