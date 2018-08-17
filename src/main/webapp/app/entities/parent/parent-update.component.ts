import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-parent-update',
    templateUrl: './parent-update.component.html'
})
export class ParentUpdateComponent implements OnInit {
    private _parent: IParent;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private parentService: ParentService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parent }) => {
            this.parent = parent;
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
        if (this.parent.id !== undefined) {
            this.subscribeToSaveResponse(this.parentService.update(this.parent));
        } else {
            this.subscribeToSaveResponse(this.parentService.create(this.parent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParent>>) {
        result.subscribe((res: HttpResponse<IParent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get parent() {
        return this._parent;
    }

    set parent(parent: IParent) {
        this._parent = parent;
    }
}
