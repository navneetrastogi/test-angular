import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImmunizationRecord } from 'app/shared/model/immunization-record.model';
import { ImmunizationRecordService } from './immunization-record.service';
import { ImmunizationRecordComponent } from './immunization-record.component';
import { ImmunizationRecordDetailComponent } from './immunization-record-detail.component';
import { ImmunizationRecordUpdateComponent } from './immunization-record-update.component';
import { ImmunizationRecordDeletePopupComponent } from './immunization-record-delete-dialog.component';
import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';

@Injectable({ providedIn: 'root' })
export class ImmunizationRecordResolve implements Resolve<IImmunizationRecord> {
    constructor(private service: ImmunizationRecordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((immunizationRecord: HttpResponse<ImmunizationRecord>) => immunizationRecord.body));
        }
        return of(new ImmunizationRecord());
    }
}

export const immunizationRecordRoute: Routes = [
    {
        path: 'immunization-record',
        component: ImmunizationRecordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.immunizationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'immunization-record/:id/view',
        component: ImmunizationRecordDetailComponent,
        resolve: {
            immunizationRecord: ImmunizationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.immunizationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'immunization-record/new',
        component: ImmunizationRecordUpdateComponent,
        resolve: {
            immunizationRecord: ImmunizationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.immunizationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'immunization-record/:id/edit',
        component: ImmunizationRecordUpdateComponent,
        resolve: {
            immunizationRecord: ImmunizationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.immunizationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const immunizationRecordPopupRoute: Routes = [
    {
        path: 'immunization-record/:id/delete',
        component: ImmunizationRecordDeletePopupComponent,
        resolve: {
            immunizationRecord: ImmunizationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.immunizationRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
