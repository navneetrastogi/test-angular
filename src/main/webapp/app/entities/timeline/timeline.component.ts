import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITimeline } from 'app/shared/model/timeline.model';
import { Principal } from 'app/core';
import { TimelineService } from './timeline.service';

@Component({
    selector: 'jhi-timeline',
    templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit, OnDestroy {
    timelines: ITimeline[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private timelineService: TimelineService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.timelineService.query().subscribe(
            (res: HttpResponse<ITimeline[]>) => {
                this.timelines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTimelines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITimeline) {
        return item.id;
    }

    registerChangeInTimelines() {
        this.eventSubscriber = this.eventManager.subscribe('timelineListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
