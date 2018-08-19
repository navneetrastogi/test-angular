import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAttendance } from 'app/shared/model/attendance.model';
import { AttendanceService } from './attendance.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-attendance-update',
    templateUrl: './attendance-update.component.html'
})
export class AttendanceUpdateComponent implements OnInit {
    private _attendance: IAttendance;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];
    datetimeDp: any;
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private attendanceService: AttendanceService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attendance }) => {
            this.attendance = attendance;
        });
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
        if (this.attendance.id !== undefined) {
            this.subscribeToSaveResponse(this.attendanceService.update(this.attendance));
        } else {
            this.subscribeToSaveResponse(this.attendanceService.create(this.attendance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAttendance>>) {
        result.subscribe((res: HttpResponse<IAttendance>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentProfileById(index: number, item: IStudentProfile) {
        return item.id;
    }
    get attendance() {
        return this._attendance;
    }

    set attendance(attendance: IAttendance) {
        this._attendance = attendance;
    }
}
