import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    TaskTypeComponent,
    TaskTypeDetailComponent,
    TaskTypeUpdateComponent,
    TaskTypeDeletePopupComponent,
    TaskTypeDeleteDialogComponent,
    taskTypeRoute,
    taskTypePopupRoute
} from './';

const ENTITY_STATES = [...taskTypeRoute, ...taskTypePopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskTypeComponent,
        TaskTypeDetailComponent,
        TaskTypeUpdateComponent,
        TaskTypeDeleteDialogComponent,
        TaskTypeDeletePopupComponent
    ],
    entryComponents: [TaskTypeComponent, TaskTypeUpdateComponent, TaskTypeDeleteDialogComponent, TaskTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularTaskTypeModule {}
