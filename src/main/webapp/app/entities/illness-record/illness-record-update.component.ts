import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIllnessRecord } from 'app/shared/model/illness-record.model';
import { IllnessRecordService } from './illness-record.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-illness-record-update',
    templateUrl: './illness-record-update.component.html'
})
export class IllnessRecordUpdateComponent implements OnInit {
    private _illnessRecord: IIllnessRecord;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private illnessRecordService: IllnessRecordService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ illnessRecord }) => {
            this.illnessRecord = illnessRecord;
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
        if (this.illnessRecord.id !== undefined) {
            this.subscribeToSaveResponse(this.illnessRecordService.update(this.illnessRecord));
        } else {
            this.subscribeToSaveResponse(this.illnessRecordService.create(this.illnessRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIllnessRecord>>) {
        result.subscribe((res: HttpResponse<IIllnessRecord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get illnessRecord() {
        return this._illnessRecord;
    }

    set illnessRecord(illnessRecord: IIllnessRecord) {
        this._illnessRecord = illnessRecord;
    }
}
