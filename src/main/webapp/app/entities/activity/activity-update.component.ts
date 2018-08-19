import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from './activity.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IActivityType } from 'app/shared/model/activity-type.model';
import { ActivityTypeService } from 'app/entities/activity-type';

@Component({
    selector: 'jhi-activity-update',
    templateUrl: './activity-update.component.html'
})
export class ActivityUpdateComponent implements OnInit {
    private _activity: IActivity;
    isSaving: boolean;

    schedules: ISchedule[];

    activitytypes: IActivityType[];
    activityDateDp: any;
    createdOnDp: any;
    lastModifiedOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private activityService: ActivityService,
        private scheduleService: ScheduleService,
        private activityTypeService: ActivityTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ activity }) => {
            this.activity = activity;
        });
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.activityTypeService.query({ filter: 'activity-is-null' }).subscribe(
            (res: HttpResponse<IActivityType[]>) => {
                if (!this.activity.activityType || !this.activity.activityType.id) {
                    this.activitytypes = res.body;
                } else {
                    this.activityTypeService.find(this.activity.activityType.id).subscribe(
                        (subRes: HttpResponse<IActivityType>) => {
                            this.activitytypes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.activity.id !== undefined) {
            this.subscribeToSaveResponse(this.activityService.update(this.activity));
        } else {
            this.subscribeToSaveResponse(this.activityService.create(this.activity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IActivity>>) {
        result.subscribe((res: HttpResponse<IActivity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }

    trackActivityTypeById(index: number, item: IActivityType) {
        return item.id;
    }
    get activity() {
        return this._activity;
    }

    set activity(activity: IActivity) {
        this._activity = activity;
    }
}
