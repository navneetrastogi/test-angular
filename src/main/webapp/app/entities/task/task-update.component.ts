import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/entities/parent';
import { ITaskType } from 'app/shared/model/task-type.model';
import { TaskTypeService } from 'app/entities/task-type';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
    private _task: ITask;
    isSaving: boolean;

    rooms: IRoom[];

    parents: IParent[];

    tasktypes: ITaskType[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private taskService: TaskService,
        private roomService: RoomService,
        private parentService: ParentService,
        private taskTypeService: TaskTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
        this.roomService.query().subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.parentService.query().subscribe(
            (res: HttpResponse<IParent[]>) => {
                this.parents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskTypeService.query().subscribe(
            (res: HttpResponse<ITaskType[]>) => {
                this.tasktypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
        result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }

    trackParentById(index: number, item: IParent) {
        return item.id;
    }

    trackTaskTypeById(index: number, item: ITaskType) {
        return item.id;
    }
    get task() {
        return this._task;
    }

    set task(task: ITask) {
        this._task = task;
    }
}
