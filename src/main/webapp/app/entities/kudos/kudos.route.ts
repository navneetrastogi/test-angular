import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Kudos } from 'app/shared/model/kudos.model';
import { KudosService } from './kudos.service';
import { KudosComponent } from './kudos.component';
import { KudosDetailComponent } from './kudos-detail.component';
import { KudosUpdateComponent } from './kudos-update.component';
import { KudosDeletePopupComponent } from './kudos-delete-dialog.component';
import { IKudos } from 'app/shared/model/kudos.model';

@Injectable({ providedIn: 'root' })
export class KudosResolve implements Resolve<IKudos> {
    constructor(private service: KudosService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((kudos: HttpResponse<Kudos>) => kudos.body));
        }
        return of(new Kudos());
    }
}

export const kudosRoute: Routes = [
    {
        path: 'kudos',
        component: KudosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'kudos/:id/view',
        component: KudosDetailComponent,
        resolve: {
            kudos: KudosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'kudos/new',
        component: KudosUpdateComponent,
        resolve: {
            kudos: KudosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudos.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'kudos/:id/edit',
        component: KudosUpdateComponent,
        resolve: {
            kudos: KudosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const kudosPopupRoute: Routes = [
    {
        path: 'kudos/:id/delete',
        component: KudosDeletePopupComponent,
        resolve: {
            kudos: KudosResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
