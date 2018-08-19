import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { KudosRecord } from 'app/shared/model/kudos-record.model';
import { KudosRecordService } from './kudos-record.service';
import { KudosRecordComponent } from './kudos-record.component';
import { KudosRecordDetailComponent } from './kudos-record-detail.component';
import { KudosRecordUpdateComponent } from './kudos-record-update.component';
import { KudosRecordDeletePopupComponent } from './kudos-record-delete-dialog.component';
import { IKudosRecord } from 'app/shared/model/kudos-record.model';

@Injectable({ providedIn: 'root' })
export class KudosRecordResolve implements Resolve<IKudosRecord> {
    constructor(private service: KudosRecordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((kudosRecord: HttpResponse<KudosRecord>) => kudosRecord.body));
        }
        return of(new KudosRecord());
    }
}

export const kudosRecordRoute: Routes = [
    {
        path: 'kudos-record',
        component: KudosRecordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudosRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'kudos-record/:id/view',
        component: KudosRecordDetailComponent,
        resolve: {
            kudosRecord: KudosRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudosRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'kudos-record/new',
        component: KudosRecordUpdateComponent,
        resolve: {
            kudosRecord: KudosRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudosRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'kudos-record/:id/edit',
        component: KudosRecordUpdateComponent,
        resolve: {
            kudosRecord: KudosRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudosRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const kudosRecordPopupRoute: Routes = [
    {
        path: 'kudos-record/:id/delete',
        component: KudosRecordDeletePopupComponent,
        resolve: {
            kudosRecord: KudosRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.kudosRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
