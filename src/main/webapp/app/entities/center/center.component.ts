import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICenter } from 'app/shared/model/center.model';
import { Principal } from 'app/core';
import { CenterService } from './center.service';

@Component({
    selector: 'jhi-center',
    templateUrl: './center.component.html'
})
export class CenterComponent implements OnInit, OnDestroy {
    centers: ICenter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private centerService: CenterService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.centerService.query().subscribe(
            (res: HttpResponse<ICenter[]>) => {
                this.centers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCenters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICenter) {
        return item.id;
    }

    registerChangeInCenters() {
        this.eventSubscriber = this.eventManager.subscribe('centerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
