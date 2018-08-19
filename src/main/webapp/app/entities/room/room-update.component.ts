import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from './room.service';
import { ICenter } from 'app/shared/model/center.model';
import { CenterService } from 'app/entities/center';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';

@Component({
    selector: 'jhi-room-update',
    templateUrl: './room-update.component.html'
})
export class RoomUpdateComponent implements OnInit {
    private _room: IRoom;
    isSaving: boolean;

    centers: ICenter[];

    schedules: ISchedule[];
    createdOnDp: any;
    lastModifiedOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private roomService: RoomService,
        private centerService: CenterService,
        private scheduleService: ScheduleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ room }) => {
            this.room = room;
        });
        this.centerService.query().subscribe(
            (res: HttpResponse<ICenter[]>) => {
                this.centers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.room.id !== undefined) {
            this.subscribeToSaveResponse(this.roomService.update(this.room));
        } else {
            this.subscribeToSaveResponse(this.roomService.create(this.room));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>) {
        result.subscribe((res: HttpResponse<IRoom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }
    get room() {
        return this._room;
    }

    set room(room: IRoom) {
        this._room = room;
    }
}
