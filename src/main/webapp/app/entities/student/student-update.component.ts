import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { ICenter } from 'app/shared/model/center.model';
import { CenterService } from 'app/entities/center';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';
import { IIncident } from 'app/shared/model/incident.model';
import { IncidentService } from 'app/entities/incident';

@Component({
    selector: 'jhi-student-update',
    templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
    private _student: IStudent;
    isSaving: boolean;

    centers: ICenter[];

    rooms: IRoom[];

    ids: IStudentProfile[];

    incidents: IIncident[];
    createdOnDp: any;
    lastModifiedOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private studentService: StudentService,
        private centerService: CenterService,
        private roomService: RoomService,
        private studentProfileService: StudentProfileService,
        private incidentService: IncidentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.centerService.query().subscribe(
            (res: HttpResponse<ICenter[]>) => {
                this.centers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roomService.query().subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentProfileService.query({ filter: 'student-is-null' }).subscribe(
            (res: HttpResponse<IStudentProfile[]>) => {
                if (!this.student.id || !this.student.id.id) {
                    this.ids = res.body;
                } else {
                    this.studentProfileService.find(this.student.id.id).subscribe(
                        (subRes: HttpResponse<IStudentProfile>) => {
                            this.ids = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.incidentService.query().subscribe(
            (res: HttpResponse<IIncident[]>) => {
                this.incidents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
        result.subscribe((res: HttpResponse<IStudent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }

    trackStudentProfileById(index: number, item: IStudentProfile) {
        return item.id;
    }

    trackIncidentById(index: number, item: IIncident) {
        return item.id;
    }
    get student() {
        return this._student;
    }

    set student(student: IStudent) {
        this._student = student;
    }
}
