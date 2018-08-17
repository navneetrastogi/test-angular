import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIllnessRecord } from 'app/shared/model/illness-record.model';
import { Principal } from 'app/core';
import { IllnessRecordService } from './illness-record.service';

@Component({
    selector: 'jhi-illness-record',
    templateUrl: './illness-record.component.html'
})
export class IllnessRecordComponent implements OnInit, OnDestroy {
    illnessRecords: IIllnessRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private illnessRecordService: IllnessRecordService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.illnessRecordService.query().subscribe(
            (res: HttpResponse<IIllnessRecord[]>) => {
                this.illnessRecords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIllnessRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIllnessRecord) {
        return item.id;
    }

    registerChangeInIllnessRecords() {
        this.eventSubscriber = this.eventManager.subscribe('illnessRecordListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
