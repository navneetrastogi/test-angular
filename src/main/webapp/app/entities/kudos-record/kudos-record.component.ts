import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKudosRecord } from 'app/shared/model/kudos-record.model';
import { Principal } from 'app/core';
import { KudosRecordService } from './kudos-record.service';

@Component({
    selector: 'jhi-kudos-record',
    templateUrl: './kudos-record.component.html'
})
export class KudosRecordComponent implements OnInit, OnDestroy {
    kudosRecords: IKudosRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private kudosRecordService: KudosRecordService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.kudosRecordService.query().subscribe(
            (res: HttpResponse<IKudosRecord[]>) => {
                this.kudosRecords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInKudosRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IKudosRecord) {
        return item.id;
    }

    registerChangeInKudosRecords() {
        this.eventSubscriber = this.eventManager.subscribe('kudosRecordListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
