import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Center } from 'app/shared/model/center.model';
import { CenterService } from './center.service';
import { CenterComponent } from './center.component';
import { CenterDetailComponent } from './center-detail.component';
import { CenterUpdateComponent } from './center-update.component';
import { CenterDeletePopupComponent } from './center-delete-dialog.component';
import { ICenter } from 'app/shared/model/center.model';

@Injectable({ providedIn: 'root' })
export class CenterResolve implements Resolve<ICenter> {
    constructor(private service: CenterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((center: HttpResponse<Center>) => center.body));
        }
        return of(new Center());
    }
}

export const centerRoute: Routes = [
    {
        path: 'center',
        component: CenterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.center.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'center/:id/view',
        component: CenterDetailComponent,
        resolve: {
            center: CenterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.center.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'center/new',
        component: CenterUpdateComponent,
        resolve: {
            center: CenterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.center.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'center/:id/edit',
        component: CenterUpdateComponent,
        resolve: {
            center: CenterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.center.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const centerPopupRoute: Routes = [
    {
        path: 'center/:id/delete',
        component: CenterDeletePopupComponent,
        resolve: {
            center: CenterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.center.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
