import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';
import { ParentComponent } from './parent.component';
import { ParentDetailComponent } from './parent-detail.component';
import { ParentUpdateComponent } from './parent-update.component';
import { ParentDeletePopupComponent } from './parent-delete-dialog.component';
import { IParent } from 'app/shared/model/parent.model';

@Injectable({ providedIn: 'root' })
export class ParentResolve implements Resolve<IParent> {
    constructor(private service: ParentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((parent: HttpResponse<Parent>) => parent.body));
        }
        return of(new Parent());
    }
}

export const parentRoute: Routes = [
    {
        path: 'parent',
        component: ParentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parent/:id/view',
        component: ParentDetailComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parent/new',
        component: ParentUpdateComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parent/:id/edit',
        component: ParentUpdateComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parentPopupRoute: Routes = [
    {
        path: 'parent/:id/delete',
        component: ParentDeletePopupComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.parent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
