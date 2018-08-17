import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MilestoneRecord } from 'app/shared/model/milestone-record.model';
import { MilestoneRecordService } from './milestone-record.service';
import { MilestoneRecordComponent } from './milestone-record.component';
import { MilestoneRecordDetailComponent } from './milestone-record-detail.component';
import { MilestoneRecordUpdateComponent } from './milestone-record-update.component';
import { MilestoneRecordDeletePopupComponent } from './milestone-record-delete-dialog.component';
import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';

@Injectable({ providedIn: 'root' })
export class MilestoneRecordResolve implements Resolve<IMilestoneRecord> {
    constructor(private service: MilestoneRecordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((milestoneRecord: HttpResponse<MilestoneRecord>) => milestoneRecord.body));
        }
        return of(new MilestoneRecord());
    }
}

export const milestoneRecordRoute: Routes = [
    {
        path: 'milestone-record',
        component: MilestoneRecordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.milestoneRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'milestone-record/:id/view',
        component: MilestoneRecordDetailComponent,
        resolve: {
            milestoneRecord: MilestoneRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.milestoneRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'milestone-record/new',
        component: MilestoneRecordUpdateComponent,
        resolve: {
            milestoneRecord: MilestoneRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.milestoneRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'milestone-record/:id/edit',
        component: MilestoneRecordUpdateComponent,
        resolve: {
            milestoneRecord: MilestoneRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.milestoneRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const milestoneRecordPopupRoute: Routes = [
    {
        path: 'milestone-record/:id/delete',
        component: MilestoneRecordDeletePopupComponent,
        resolve: {
            milestoneRecord: MilestoneRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.milestoneRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
