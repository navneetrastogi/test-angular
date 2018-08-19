import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
import { ImmunizationRecordService } from './immunization-record.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-immunization-record-update',
    templateUrl: './immunization-record-update.component.html'
})
export class ImmunizationRecordUpdateComponent implements OnInit {
    private _immunizationRecord: IImmunizationRecord;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];
    createdOnDp: any;
    vaccinationDoneOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private immunizationRecordService: ImmunizationRecordService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ immunizationRecord }) => {
            this.immunizationRecord = immunizationRecord;
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
        if (this.immunizationRecord.id !== undefined) {
            this.subscribeToSaveResponse(this.immunizationRecordService.update(this.immunizationRecord));
        } else {
            this.subscribeToSaveResponse(this.immunizationRecordService.create(this.immunizationRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IImmunizationRecord>>) {
        result.subscribe((res: HttpResponse<IImmunizationRecord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get immunizationRecord() {
        return this._immunizationRecord;
    }

    set immunizationRecord(immunizationRecord: IImmunizationRecord) {
        this._immunizationRecord = immunizationRecord;
    }
}
