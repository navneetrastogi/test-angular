import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IllnessRecord } from 'app/shared/model/illness-record.model';
import { IllnessRecordService } from './illness-record.service';
import { IllnessRecordComponent } from './illness-record.component';
import { IllnessRecordDetailComponent } from './illness-record-detail.component';
import { IllnessRecordUpdateComponent } from './illness-record-update.component';
import { IllnessRecordDeletePopupComponent } from './illness-record-delete-dialog.component';
import { IIllnessRecord } from 'app/shared/model/illness-record.model';

@Injectable({ providedIn: 'root' })
export class IllnessRecordResolve implements Resolve<IIllnessRecord> {
    constructor(private service: IllnessRecordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((illnessRecord: HttpResponse<IllnessRecord>) => illnessRecord.body));
        }
        return of(new IllnessRecord());
    }
}

export const illnessRecordRoute: Routes = [
    {
        path: 'illness-record',
        component: IllnessRecordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.illnessRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'illness-record/:id/view',
        component: IllnessRecordDetailComponent,
        resolve: {
            illnessRecord: IllnessRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.illnessRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'illness-record/new',
        component: IllnessRecordUpdateComponent,
        resolve: {
            illnessRecord: IllnessRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.illnessRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'illness-record/:id/edit',
        component: IllnessRecordUpdateComponent,
        resolve: {
            illnessRecord: IllnessRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.illnessRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const illnessRecordPopupRoute: Routes = [
    {
        path: 'illness-record/:id/delete',
        component: IllnessRecordDeletePopupComponent,
        resolve: {
            illnessRecord: IllnessRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.illnessRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
