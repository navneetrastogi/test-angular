import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICenter } from 'app/shared/model/center.model';
import { CenterService } from './center.service';
import { IOrganization } from 'app/shared/model/organization.model';
import { OrganizationService } from 'app/entities/organization';

@Component({
    selector: 'jhi-center-update',
    templateUrl: './center-update.component.html'
})
export class CenterUpdateComponent implements OnInit {
    private _center: ICenter;
    isSaving: boolean;

    organizations: IOrganization[];
    createdOnDp: any;
    lastModifiedOnDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private centerService: CenterService,
        private organizationService: OrganizationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ center }) => {
            this.center = center;
        });
        this.organizationService.query().subscribe(
            (res: HttpResponse<IOrganization[]>) => {
                this.organizations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.center.id !== undefined) {
            this.subscribeToSaveResponse(this.centerService.update(this.center));
        } else {
            this.subscribeToSaveResponse(this.centerService.create(this.center));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICenter>>) {
        result.subscribe((res: HttpResponse<ICenter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrganizationById(index: number, item: IOrganization) {
        return item.id;
    }
    get center() {
        return this._center;
    }

    set center(center: ICenter) {
        this._center = center;
    }
}
