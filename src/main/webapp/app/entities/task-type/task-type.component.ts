import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITaskType } from 'app/shared/model/task-type.model';
import { Principal } from 'app/core';
import { TaskTypeService } from './task-type.service';

@Component({
    selector: 'jhi-task-type',
    templateUrl: './task-type.component.html'
})
export class TaskTypeComponent implements OnInit, OnDestroy {
    taskTypes: ITaskType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private taskTypeService: TaskTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.taskTypeService.query().subscribe(
            (res: HttpResponse<ITaskType[]>) => {
                this.taskTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTaskTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITaskType) {
        return item.id;
    }

    registerChangeInTaskTypes() {
        this.eventSubscriber = this.eventManager.subscribe('taskTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
