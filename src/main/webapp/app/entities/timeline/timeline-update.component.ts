import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITimeline } from 'app/shared/model/timeline.model';
import { TimelineService } from './timeline.service';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-timeline-update',
    templateUrl: './timeline-update.component.html'
})
export class TimelineUpdateComponent implements OnInit {
    private _timeline: ITimeline;
    isSaving: boolean;

    schedules: ISchedule[];

    studentprofiles: IStudentProfile[];
    dateDp: any;
    isVisibleDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private timelineService: TimelineService,
        private scheduleService: ScheduleService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ timeline }) => {
            this.timeline = timeline;
        });
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentProfileService.query().subscribe(
            (res: HttpResponse<IStudentProfile[]>) => {
                this.studentprofiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.timeline.id !== undefined) {
            this.subscribeToSaveResponse(this.timelineService.update(this.timeline));
        } else {
            this.subscribeToSaveResponse(this.timelineService.create(this.timeline));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITimeline>>) {
        result.subscribe((res: HttpResponse<ITimeline>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentProfileById(index: number, item: IStudentProfile) {
        return item.id;
    }
    get timeline() {
        return this._timeline;
    }

    set timeline(timeline: ITimeline) {
        this._timeline = timeline;
    }
}
