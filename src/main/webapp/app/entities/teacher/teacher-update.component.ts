import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { ICenter } from 'app/shared/model/center.model';
import { CenterService } from 'app/entities/center';

@Component({
    selector: 'jhi-teacher-update',
    templateUrl: './teacher-update.component.html'
})
export class TeacherUpdateComponent implements OnInit {
    private _teacher: ITeacher;
    isSaving: boolean;

    centers: ICenter[];
    createdOnDp: any;
    joiningDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherService,
        private centerService: CenterService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.centerService.query().subscribe(
            (res: HttpResponse<ICenter[]>) => {
                this.centers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacher) {
        this._teacher = teacher;
    }
}
