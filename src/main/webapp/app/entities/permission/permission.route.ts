import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from 'app/shared/model/permission.model';
import { PermissionService } from './permission.service';
import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionUpdateComponent } from './permission-update.component';
import { PermissionDeletePopupComponent } from './permission-delete-dialog.component';
import { IPermission } from 'app/shared/model/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionResolve implements Resolve<IPermission> {
    constructor(private service: PermissionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((permission: HttpResponse<Permission>) => permission.body));
        }
        return of(new Permission());
    }
}

export const permissionRoute: Routes = [
    {
        path: 'permission',
        component: PermissionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.permission.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permission/:id/view',
        component: PermissionDetailComponent,
        resolve: {
            permission: PermissionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.permission.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permission/new',
        component: PermissionUpdateComponent,
        resolve: {
            permission: PermissionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.permission.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'permission/:id/edit',
        component: PermissionUpdateComponent,
        resolve: {
            permission: PermissionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.permission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permissionPopupRoute: Routes = [
    {
        path: 'permission/:id/delete',
        component: PermissionDeletePopupComponent,
        resolve: {
            permission: PermissionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.permission.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
