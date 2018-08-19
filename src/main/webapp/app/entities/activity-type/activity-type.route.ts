import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivityType } from 'app/shared/model/activity-type.model';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeComponent } from './activity-type.component';
import { ActivityTypeDetailComponent } from './activity-type-detail.component';
import { ActivityTypeUpdateComponent } from './activity-type-update.component';
import { ActivityTypeDeletePopupComponent } from './activity-type-delete-dialog.component';
import { IActivityType } from 'app/shared/model/activity-type.model';

@Injectable({ providedIn: 'root' })
export class ActivityTypeResolve implements Resolve<IActivityType> {
    constructor(private service: ActivityTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((activityType: HttpResponse<ActivityType>) => activityType.body));
        }
        return of(new ActivityType());
    }
}

export const activityTypeRoute: Routes = [
    {
        path: 'activity-type',
        component: ActivityTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.activityType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'activity-type/:id/view',
        component: ActivityTypeDetailComponent,
        resolve: {
            activityType: ActivityTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.activityType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'activity-type/new',
        component: ActivityTypeUpdateComponent,
        resolve: {
            activityType: ActivityTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.activityType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'activity-type/:id/edit',
        component: ActivityTypeUpdateComponent,
        resolve: {
            activityType: ActivityTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.activityType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activityTypePopupRoute: Routes = [
    {
        path: 'activity-type/:id/delete',
        component: ActivityTypeDeletePopupComponent,
        resolve: {
            activityType: ActivityTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.activityType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
