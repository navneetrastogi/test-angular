import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    StudentProfileComponent,
    StudentProfileDetailComponent,
    StudentProfileUpdateComponent,
    StudentProfileDeletePopupComponent,
    StudentProfileDeleteDialogComponent,
    studentProfileRoute,
    studentProfilePopupRoute
} from './';

const ENTITY_STATES = [...studentProfileRoute, ...studentProfilePopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentProfileComponent,
        StudentProfileDetailComponent,
        StudentProfileUpdateComponent,
        StudentProfileDeleteDialogComponent,
        StudentProfileDeletePopupComponent
    ],
    entryComponents: [
        StudentProfileComponent,
        StudentProfileUpdateComponent,
        StudentProfileDeleteDialogComponent,
        StudentProfileDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularStudentProfileModule {}
