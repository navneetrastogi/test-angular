import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMilestone } from 'app/shared/model/milestone.model';
import { MilestoneService } from './milestone.service';

@Component({
    selector: 'jhi-milestone-update',
    templateUrl: './milestone-update.component.html'
})
export class MilestoneUpdateComponent implements OnInit {
    private _milestone: IMilestone;
    isSaving: boolean;
    createdOnDp: any;
    lastModifiedOnDp: any;

    constructor(private milestoneService: MilestoneService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ milestone }) => {
            this.milestone = milestone;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.milestone.id !== undefined) {
            this.subscribeToSaveResponse(this.milestoneService.update(this.milestone));
        } else {
            this.subscribeToSaveResponse(this.milestoneService.create(this.milestone));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMilestone>>) {
        result.subscribe((res: HttpResponse<IMilestone>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get milestone() {
        return this._milestone;
    }

    set milestone(milestone: IMilestone) {
        this._milestone = milestone;
    }
}
