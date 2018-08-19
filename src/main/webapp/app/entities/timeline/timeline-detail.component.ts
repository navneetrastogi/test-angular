import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimeline } from 'app/shared/model/timeline.model';

@Component({
    selector: 'jhi-timeline-detail',
    templateUrl: './timeline-detail.component.html'
})
export class TimelineDetailComponent implements OnInit {
    timeline: ITimeline;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timeline }) => {
            this.timeline = timeline;
        });
    }

    previousState() {
        window.history.back();
    }
}
