import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPhoto } from 'app/shared/model/photo.model';
import { PhotoService } from './photo.service';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from 'app/entities/activity';

@Component({
    selector: 'jhi-photo-update',
    templateUrl: './photo-update.component.html'
})
export class PhotoUpdateComponent implements OnInit {
    private _photo: IPhoto;
    isSaving: boolean;

    events: IEvent[];

    activities: IActivity[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private photoService: PhotoService,
        private eventService: EventService,
        private activityService: ActivityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ photo }) => {
            this.photo = photo;
        });
        this.eventService.query().subscribe(
            (res: HttpResponse<IEvent[]>) => {
                this.events = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.activityService.query().subscribe(
            (res: HttpResponse<IActivity[]>) => {
                this.activities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.photo.id !== undefined) {
            this.subscribeToSaveResponse(this.photoService.update(this.photo));
        } else {
            this.subscribeToSaveResponse(this.photoService.create(this.photo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPhoto>>) {
        result.subscribe((res: HttpResponse<IPhoto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEventById(index: number, item: IEvent) {
        return item.id;
    }

    trackActivityById(index: number, item: IActivity) {
        return item.id;
    }
    get photo() {
        return this._photo;
    }

    set photo(photo: IPhoto) {
        this._photo = photo;
    }
}
