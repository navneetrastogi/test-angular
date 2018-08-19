import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incident } from 'app/shared/model/incident.model';
import { IncidentService } from './incident.service';
import { IncidentComponent } from './incident.component';
import { IncidentDetailComponent } from './incident-detail.component';
import { IncidentUpdateComponent } from './incident-update.component';
import { IncidentDeletePopupComponent } from './incident-delete-dialog.component';
import { IIncident } from 'app/shared/model/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentResolve implements Resolve<IIncident> {
    constructor(private service: IncidentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((incident: HttpResponse<Incident>) => incident.body));
        }
        return of(new Incident());
    }
}

export const incidentRoute: Routes = [
    {
        path: 'incident',
        component: IncidentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'incident/:id/view',
        component: IncidentDetailComponent,
        resolve: {
            incident: IncidentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'incident/new',
        component: IncidentUpdateComponent,
        resolve: {
            incident: IncidentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'incident/:id/edit',
        component: IncidentUpdateComponent,
        resolve: {
            incident: IncidentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const incidentPopupRoute: Routes = [
    {
        path: 'incident/:id/delete',
        component: IncidentDeletePopupComponent,
        resolve: {
            incident: IncidentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.incident.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
