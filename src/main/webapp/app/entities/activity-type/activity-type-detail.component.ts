import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActivityType } from 'app/shared/model/activity-type.model';

@Component({
    selector: 'jhi-activity-type-detail',
    templateUrl: './activity-type-detail.component.html'
})
export class ActivityTypeDetailComponent implements OnInit {
    activityType: IActivityType;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ activityType }) => {
            this.activityType = activityType;
        });
    }

    previousState() {
        window.history.back();
    }
}
