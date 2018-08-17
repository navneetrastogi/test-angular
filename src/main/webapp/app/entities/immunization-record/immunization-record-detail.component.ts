import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';

@Component({
    selector: 'jhi-immunization-record-detail',
    templateUrl: './immunization-record-detail.component.html'
})
export class ImmunizationRecordDetailComponent implements OnInit {
    immunizationRecord: IImmunizationRecord;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ immunizationRecord }) => {
            this.immunizationRecord = immunizationRecord;
        });
    }

    previousState() {
        window.history.back();
    }
}
