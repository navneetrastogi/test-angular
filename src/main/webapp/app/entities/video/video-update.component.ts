import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVideo } from 'app/shared/model/video.model';
import { VideoService } from './video.service';
import { IEvent } from 'app/shared/model/event.model';
import { EventService } from 'app/entities/event';
import { IActivity } from 'app/shared/model/activity.model';
import { ActivityService } from 'app/entities/activity';

@Component({
    selector: 'jhi-video-update',
    templateUrl: './video-update.component.html'
})
export class VideoUpdateComponent implements OnInit {
    private _video: IVideo;
    isSaving: boolean;

    events: IEvent[];

    activities: IActivity[];
    uploadedDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private videoService: VideoService,
        private eventService: EventService,
        private activityService: ActivityService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ video }) => {
            this.video = video;
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
        if (this.video.id !== undefined) {
            this.subscribeToSaveResponse(this.videoService.update(this.video));
        } else {
            this.subscribeToSaveResponse(this.videoService.create(this.video));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVideo>>) {
        result.subscribe((res: HttpResponse<IVideo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get video() {
        return this._video;
    }

    set video(video: IVideo) {
        this._video = video;
    }
}
