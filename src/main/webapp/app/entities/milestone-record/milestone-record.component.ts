import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';
import { Principal } from 'app/core';
import { MilestoneRecordService } from './milestone-record.service';

@Component({
    selector: 'jhi-milestone-record',
    templateUrl: './milestone-record.component.html'
})
export class MilestoneRecordComponent implements OnInit, OnDestroy {
    milestoneRecords: IMilestoneRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private milestoneRecordService: MilestoneRecordService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.milestoneRecordService.query().subscribe(
            (res: HttpResponse<IMilestoneRecord[]>) => {
                this.milestoneRecords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMilestoneRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMilestoneRecord) {
        return item.id;
    }

    registerChangeInMilestoneRecords() {
        this.eventSubscriber = this.eventManager.subscribe('milestoneRecordListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
