import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';
import { MilestoneRecordService } from './milestone-record.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';
import { IMilestone } from 'app/shared/model/milestone.model';
import { MilestoneService } from 'app/entities/milestone';

@Component({
    selector: 'jhi-milestone-record-update',
    templateUrl: './milestone-record-update.component.html'
})
export class MilestoneRecordUpdateComponent implements OnInit {
    private _milestoneRecord: IMilestoneRecord;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];

    milestones: IMilestone[];
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private milestoneRecordService: MilestoneRecordService,
        private studentProfileService: StudentProfileService,
        private milestoneService: MilestoneService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ milestoneRecord }) => {
            this.milestoneRecord = milestoneRecord;
        });
        this.studentProfileService.query().subscribe(
            (res: HttpResponse<IStudentProfile[]>) => {
                this.studentprofiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.milestoneService.query().subscribe(
            (res: HttpResponse<IMilestone[]>) => {
                this.milestones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.milestoneRecord.id !== undefined) {
            this.subscribeToSaveResponse(this.milestoneRecordService.update(this.milestoneRecord));
        } else {
            this.subscribeToSaveResponse(this.milestoneRecordService.create(this.milestoneRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMilestoneRecord>>) {
        result.subscribe((res: HttpResponse<IMilestoneRecord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMilestoneById(index: number, item: IMilestone) {
        return item.id;
    }
    get milestoneRecord() {
        return this._milestoneRecord;
    }

    set milestoneRecord(milestoneRecord: IMilestoneRecord) {
        this._milestoneRecord = milestoneRecord;
    }
}
