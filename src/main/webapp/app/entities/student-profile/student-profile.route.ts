import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentProfile } from 'app/shared/model/student-profile.model';
import { StudentProfileService } from './student-profile.service';
import { StudentProfileComponent } from './student-profile.component';
import { StudentProfileDetailComponent } from './student-profile-detail.component';
import { StudentProfileUpdateComponent } from './student-profile-update.component';
import { StudentProfileDeletePopupComponent } from './student-profile-delete-dialog.component';
import { IStudentProfile } from 'app/shared/model/student-profile.model';

@Injectable({ providedIn: 'root' })
export class StudentProfileResolve implements Resolve<IStudentProfile> {
    constructor(private service: StudentProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((studentProfile: HttpResponse<StudentProfile>) => studentProfile.body));
        }
        return of(new StudentProfile());
    }
}

export const studentProfileRoute: Routes = [
    {
        path: 'student-profile',
        component: StudentProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.studentProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-profile/:id/view',
        component: StudentProfileDetailComponent,
        resolve: {
            studentProfile: StudentProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.studentProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-profile/new',
        component: StudentProfileUpdateComponent,
        resolve: {
            studentProfile: StudentProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.studentProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-profile/:id/edit',
        component: StudentProfileUpdateComponent,
        resolve: {
            studentProfile: StudentProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.studentProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentProfilePopupRoute: Routes = [
    {
        path: 'student-profile/:id/delete',
        component: StudentProfileDeletePopupComponent,
        resolve: {
            studentProfile: StudentProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.studentProfile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
