import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/entities/parent';

@Component({
    selector: 'jhi-notification-update',
    templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
    private _notification: INotification;
    isSaving: boolean;

    parents: IParent[];
    dateDp: any;
    createdOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private notificationService: NotificationService,
        private parentService: ParentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notification }) => {
            this.notification = notification;
        });
        this.parentService.query().subscribe(
            (res: HttpResponse<IParent[]>) => {
                this.parents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.notification.id !== undefined) {
            this.subscribeToSaveResponse(this.notificationService.update(this.notification));
        } else {
            this.subscribeToSaveResponse(this.notificationService.create(this.notification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>) {
        result.subscribe((res: HttpResponse<INotification>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParentById(index: number, item: IParent) {
        return item.id;
    }
    get notification() {
        return this._notification;
    }

    set notification(notification: INotification) {
        this._notification = notification;
    }
}
