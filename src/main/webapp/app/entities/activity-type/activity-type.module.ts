import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    ActivityTypeComponent,
    ActivityTypeDetailComponent,
    ActivityTypeUpdateComponent,
    ActivityTypeDeletePopupComponent,
    ActivityTypeDeleteDialogComponent,
    activityTypeRoute,
    activityTypePopupRoute
} from './';

const ENTITY_STATES = [...activityTypeRoute, ...activityTypePopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ActivityTypeComponent,
        ActivityTypeDetailComponent,
        ActivityTypeUpdateComponent,
        ActivityTypeDeleteDialogComponent,
        ActivityTypeDeletePopupComponent
    ],
    entryComponents: [
        ActivityTypeComponent,
        ActivityTypeUpdateComponent,
        ActivityTypeDeleteDialogComponent,
        ActivityTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularActivityTypeModule {}
