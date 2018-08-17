import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    MilestoneRecordComponent,
    MilestoneRecordDetailComponent,
    MilestoneRecordUpdateComponent,
    MilestoneRecordDeletePopupComponent,
    MilestoneRecordDeleteDialogComponent,
    milestoneRecordRoute,
    milestoneRecordPopupRoute
} from './';

const ENTITY_STATES = [...milestoneRecordRoute, ...milestoneRecordPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MilestoneRecordComponent,
        MilestoneRecordDetailComponent,
        MilestoneRecordUpdateComponent,
        MilestoneRecordDeleteDialogComponent,
        MilestoneRecordDeletePopupComponent
    ],
    entryComponents: [
        MilestoneRecordComponent,
        MilestoneRecordUpdateComponent,
        MilestoneRecordDeleteDialogComponent,
        MilestoneRecordDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularMilestoneRecordModule {}
