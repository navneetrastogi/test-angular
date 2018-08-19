import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IActivityType } from 'app/shared/model/activity-type.model';
import { ActivityTypeService } from './activity-type.service';

@Component({
    selector: 'jhi-activity-type-update',
    templateUrl: './activity-type-update.component.html'
})
export class ActivityTypeUpdateComponent implements OnInit {
    private _activityType: IActivityType;
    isSaving: boolean;

    constructor(private activityTypeService: ActivityTypeService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ activityType }) => {
            this.activityType = activityType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.activityType.id !== undefined) {
            this.subscribeToSaveResponse(this.activityTypeService.update(this.activityType));
        } else {
            this.subscribeToSaveResponse(this.activityTypeService.create(this.activityType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IActivityType>>) {
        result.subscribe((res: HttpResponse<IActivityType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get activityType() {
        return this._activityType;
    }

    set activityType(activityType: IActivityType) {
        this._activityType = activityType;
    }
}
