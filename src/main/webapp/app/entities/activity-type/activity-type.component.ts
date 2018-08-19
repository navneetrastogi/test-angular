import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IActivityType } from 'app/shared/model/activity-type.model';
import { Principal } from 'app/core';
import { ActivityTypeService } from './activity-type.service';

@Component({
    selector: 'jhi-activity-type',
    templateUrl: './activity-type.component.html'
})
export class ActivityTypeComponent implements OnInit, OnDestroy {
    activityTypes: IActivityType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private activityTypeService: ActivityTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.activityTypeService.query().subscribe(
            (res: HttpResponse<IActivityType[]>) => {
                this.activityTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInActivityTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IActivityType) {
        return item.id;
    }

    registerChangeInActivityTypes() {
        this.eventSubscriber = this.eventManager.subscribe('activityTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
