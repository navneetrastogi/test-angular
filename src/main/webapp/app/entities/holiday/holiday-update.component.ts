import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHoliday } from 'app/shared/model/holiday.model';
import { HolidayService } from './holiday.service';
import { ICenter } from 'app/shared/model/center.model';
import { CenterService } from 'app/entities/center';

@Component({
    selector: 'jhi-holiday-update',
    templateUrl: './holiday-update.component.html'
})
export class HolidayUpdateComponent implements OnInit {
    private _holiday: IHoliday;
    isSaving: boolean;

    centers: ICenter[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private holidayService: HolidayService,
        private centerService: CenterService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ holiday }) => {
            this.holiday = holiday;
        });
        this.centerService.query().subscribe(
            (res: HttpResponse<ICenter[]>) => {
                this.centers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.holiday.id !== undefined) {
            this.subscribeToSaveResponse(this.holidayService.update(this.holiday));
        } else {
            this.subscribeToSaveResponse(this.holidayService.create(this.holiday));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHoliday>>) {
        result.subscribe((res: HttpResponse<IHoliday>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCenterById(index: number, item: ICenter) {
        return item.id;
    }
    get holiday() {
        return this._holiday;
    }

    set holiday(holiday: IHoliday) {
        this._holiday = holiday;
    }
}
