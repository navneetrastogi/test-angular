import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IKudosRecord } from 'app/shared/model/kudos-record.model';
import { KudosRecordService } from './kudos-record.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';
import { IKudos } from 'app/shared/model/kudos.model';
import { KudosService } from 'app/entities/kudos';

@Component({
    selector: 'jhi-kudos-record-update',
    templateUrl: './kudos-record-update.component.html'
})
export class KudosRecordUpdateComponent implements OnInit {
    private _kudosRecord: IKudosRecord;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];

    kudos: IKudos[];
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private kudosRecordService: KudosRecordService,
        private studentProfileService: StudentProfileService,
        private kudosService: KudosService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ kudosRecord }) => {
            this.kudosRecord = kudosRecord;
        });
        this.studentProfileService.query().subscribe(
            (res: HttpResponse<IStudentProfile[]>) => {
                this.studentprofiles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.kudosService.query().subscribe(
            (res: HttpResponse<IKudos[]>) => {
                this.kudos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.kudosRecord.id !== undefined) {
            this.subscribeToSaveResponse(this.kudosRecordService.update(this.kudosRecord));
        } else {
            this.subscribeToSaveResponse(this.kudosRecordService.create(this.kudosRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IKudosRecord>>) {
        result.subscribe((res: HttpResponse<IKudosRecord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackKudosById(index: number, item: IKudos) {
        return item.id;
    }
    get kudosRecord() {
        return this._kudosRecord;
    }

    set kudosRecord(kudosRecord: IKudosRecord) {
        this._kudosRecord = kudosRecord;
    }
}
