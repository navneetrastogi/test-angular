import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFeature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/entities/parent';

@Component({
    selector: 'jhi-feature-update',
    templateUrl: './feature-update.component.html'
})
export class FeatureUpdateComponent implements OnInit {
    private _feature: IFeature;
    isSaving: boolean;

    parents: IParent[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private featureService: FeatureService,
        private parentService: ParentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ feature }) => {
            this.feature = feature;
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
        if (this.feature.id !== undefined) {
            this.subscribeToSaveResponse(this.featureService.update(this.feature));
        } else {
            this.subscribeToSaveResponse(this.featureService.create(this.feature));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFeature>>) {
        result.subscribe((res: HttpResponse<IFeature>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get feature() {
        return this._feature;
    }

    set feature(feature: IFeature) {
        this._feature = feature;
    }
}
