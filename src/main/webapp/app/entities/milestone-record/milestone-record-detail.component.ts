import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';

@Component({
    selector: 'jhi-milestone-record-detail',
    templateUrl: './milestone-record-detail.component.html'
})
export class MilestoneRecordDetailComponent implements OnInit {
    milestoneRecord: IMilestoneRecord;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ milestoneRecord }) => {
            this.milestoneRecord = milestoneRecord;
        });
    }

    previousState() {
        window.history.back();
    }
}
