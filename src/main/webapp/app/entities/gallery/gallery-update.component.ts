import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGallery } from 'app/shared/model/gallery.model';
import { GalleryService } from './gallery.service';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from 'app/entities/student-profile';

@Component({
    selector: 'jhi-gallery-update',
    templateUrl: './gallery-update.component.html'
})
export class GalleryUpdateComponent implements OnInit {
    private _gallery: IGallery;
    isSaving: boolean;

    studentprofiles: IStudentProfile[];
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private galleryService: GalleryService,
        private studentProfileService: StudentProfileService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gallery }) => {
            this.gallery = gallery;
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
        if (this.gallery.id !== undefined) {
            this.subscribeToSaveResponse(this.galleryService.update(this.gallery));
        } else {
            this.subscribeToSaveResponse(this.galleryService.create(this.gallery));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGallery>>) {
        result.subscribe((res: HttpResponse<IGallery>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get gallery() {
        return this._gallery;
    }

    set gallery(gallery: IGallery) {
        this._gallery = gallery;
    }
}
