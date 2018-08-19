import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from './student-profile.service';

@Component({
    selector: 'jhi-student-profile-update',
    templateUrl: './student-profile-update.component.html'
})
export class StudentProfileUpdateComponent implements OnInit {
    private _studentProfile: IStudentProfile;
    isSaving: boolean;
    birthDateDp: any;

    constructor(private studentProfileService: StudentProfileService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ studentProfile }) => {
            this.studentProfile = studentProfile;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.studentProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.studentProfileService.update(this.studentProfile));
        } else {
            this.subscribeToSaveResponse(this.studentProfileService.create(this.studentProfile));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentProfile>>) {
        result.subscribe((res: HttpResponse<IStudentProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get studentProfile() {
        return this._studentProfile;
    }

    set studentProfile(studentProfile: IStudentProfile) {
        this._studentProfile = studentProfile;
    }
}
