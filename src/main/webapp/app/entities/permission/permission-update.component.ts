import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPermission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/entities/parent';

@Component({
    selector: 'jhi-permission-update',
    templateUrl: './permission-update.component.html'
})
export class PermissionUpdateComponent implements OnInit {
    private _permission: IPermission;
    isSaving: boolean;

    parents: IParent[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private permissionService: PermissionService,
        private parentService: ParentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ permission }) => {
            this.permission = permission;
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
        if (this.permission.id !== undefined) {
            this.subscribeToSaveResponse(this.permissionService.update(this.permission));
        } else {
            this.subscribeToSaveResponse(this.permissionService.create(this.permission));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPermission>>) {
        result.subscribe((res: HttpResponse<IPermission>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get permission() {
        return this._permission;
    }

    set permission(permission: IPermission) {
        this._permission = permission;
    }
}
