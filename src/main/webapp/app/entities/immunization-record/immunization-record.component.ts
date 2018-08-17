import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
import { Principal } from 'app/core';
import { ImmunizationRecordService } from './immunization-record.service';

@Component({
    selector: 'jhi-immunization-record',
    templateUrl: './immunization-record.component.html'
})
export class ImmunizationRecordComponent implements OnInit, OnDestroy {
    immunizationRecords: IImmunizationRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private immunizationRecordService: ImmunizationRecordService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.immunizationRecordService.query().subscribe(
            (res: HttpResponse<IImmunizationRecord[]>) => {
                this.immunizationRecords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInImmunizationRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IImmunizationRecord) {
        return item.id;
    }

    registerChangeInImmunizationRecords() {
        this.eventSubscriber = this.eventManager.subscribe('immunizationRecordListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
