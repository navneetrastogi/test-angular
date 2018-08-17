import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPermission } from 'app/shared/model/permission.model';
import { Principal } from 'app/core';
import { PermissionService } from './permission.service';

@Component({
    selector: 'jhi-permission',
    templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit, OnDestroy {
    permissions: IPermission[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private permissionService: PermissionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.permissionService.query().subscribe(
            (res: HttpResponse<IPermission[]>) => {
                this.permissions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPermissions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPermission) {
        return item.id;
    }

    registerChangeInPermissions() {
        this.eventSubscriber = this.eventManager.subscribe('permissionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
