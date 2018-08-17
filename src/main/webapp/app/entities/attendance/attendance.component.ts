import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAttendance } from 'app/shared/model/attendance.model';
import { Principal } from 'app/core';
import { AttendanceService } from './attendance.service';

@Component({
    selector: 'jhi-attendance',
    templateUrl: './attendance.component.html'
})
export class AttendanceComponent implements OnInit, OnDestroy {
    attendances: IAttendance[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private attendanceService: AttendanceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.attendanceService.query().subscribe(
            (res: HttpResponse<IAttendance[]>) => {
                this.attendances = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAttendances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAttendance) {
        return item.id;
    }

    registerChangeInAttendances() {
        this.eventSubscriber = this.eventManager.subscribe('attendanceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
