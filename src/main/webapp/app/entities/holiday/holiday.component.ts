import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHoliday } from 'app/shared/model/holiday.model';
import { Principal } from 'app/core';
import { HolidayService } from './holiday.service';

@Component({
    selector: 'jhi-holiday',
    templateUrl: './holiday.component.html'
})
export class HolidayComponent implements OnInit, OnDestroy {
    holidays: IHoliday[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private holidayService: HolidayService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.holidayService.query().subscribe(
            (res: HttpResponse<IHoliday[]>) => {
                this.holidays = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHolidays();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHoliday) {
        return item.id;
    }

    registerChangeInHolidays() {
        this.eventSubscriber = this.eventManager.subscribe('holidayListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
