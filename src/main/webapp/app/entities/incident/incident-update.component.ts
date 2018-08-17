import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIncident } from 'app/shared/model/incident.model';
import { IncidentService } from './incident.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-incident-update',
    templateUrl: './incident-update.component.html'
})
export class IncidentUpdateComponent implements OnInit {
    private _incident: IIncident;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];
    dateDp: any;
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private incidentService: IncidentService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ incident }) => {
            this.incident = incident;
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
        if (this.incident.id !== undefined) {
            this.subscribeToSaveResponse(this.incidentService.update(this.incident));
        } else {
            this.subscribeToSaveResponse(this.incidentService.create(this.incident));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIncident>>) {
        result.subscribe((res: HttpResponse<IIncident>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get incident() {
        return this._incident;
    }

    set incident(incident: IIncident) {
        this._incident = incident;
    }
}
