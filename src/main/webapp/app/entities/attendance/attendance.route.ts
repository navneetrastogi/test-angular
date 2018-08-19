import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attendance } from 'app/shared/model/attendance.model';
import { AttendanceService } from './attendance.service';
import { AttendanceComponent } from './attendance.component';
import { AttendanceDetailComponent } from './attendance-detail.component';
import { AttendanceUpdateComponent } from './attendance-update.component';
import { AttendanceDeletePopupComponent } from './attendance-delete-dialog.component';
import { IAttendance } from 'app/shared/model/attendance.model';

@Injectable({ providedIn: 'root' })
export class AttendanceResolve implements Resolve<IAttendance> {
    constructor(private service: AttendanceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((attendance: HttpResponse<Attendance>) => attendance.body));
        }
        return of(new Attendance());
    }
}

export const attendanceRoute: Routes = [
    {
        path: 'attendance',
        component: AttendanceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.attendance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attendance/:id/view',
        component: AttendanceDetailComponent,
        resolve: {
            attendance: AttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.attendance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attendance/new',
        component: AttendanceUpdateComponent,
        resolve: {
            attendance: AttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.attendance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'attendance/:id/edit',
        component: AttendanceUpdateComponent,
        resolve: {
            attendance: AttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.attendance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attendancePopupRoute: Routes = [
    {
        path: 'attendance/:id/delete',
        component: AttendanceDeletePopupComponent,
        resolve: {
            attendance: AttendanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.attendance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
