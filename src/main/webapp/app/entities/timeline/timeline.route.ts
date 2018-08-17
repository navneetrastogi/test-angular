import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timeline } from 'app/shared/model/timeline.model';
import { TimelineService } from './timeline.service';
import { TimelineComponent } from './timeline.component';
import { TimelineDetailComponent } from './timeline-detail.component';
import { TimelineUpdateComponent } from './timeline-update.component';
import { TimelineDeletePopupComponent } from './timeline-delete-dialog.component';
import { ITimeline } from 'app/shared/model/timeline.model';

@Injectable({ providedIn: 'root' })
export class TimelineResolve implements Resolve<ITimeline> {
    constructor(private service: TimelineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((timeline: HttpResponse<Timeline>) => timeline.body));
        }
        return of(new Timeline());
    }
}

export const timelineRoute: Routes = [
    {
        path: 'timeline',
        component: TimelineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.timeline.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'timeline/:id/view',
        component: TimelineDetailComponent,
        resolve: {
            timeline: TimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.timeline.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'timeline/new',
        component: TimelineUpdateComponent,
        resolve: {
            timeline: TimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.timeline.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'timeline/:id/edit',
        component: TimelineUpdateComponent,
        resolve: {
            timeline: TimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.timeline.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timelinePopupRoute: Routes = [
    {
        path: 'timeline/:id/delete',
        component: TimelineDeletePopupComponent,
        resolve: {
            timeline: TimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.timeline.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
