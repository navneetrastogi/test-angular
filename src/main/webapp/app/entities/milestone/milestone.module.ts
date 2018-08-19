import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    MilestoneComponent,
    MilestoneDetailComponent,
    MilestoneUpdateComponent,
    MilestoneDeletePopupComponent,
    MilestoneDeleteDialogComponent,
    milestoneRoute,
    milestonePopupRoute
} from './';

const ENTITY_STATES = [...milestoneRoute, ...milestonePopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MilestoneComponent,
        MilestoneDetailComponent,
        MilestoneUpdateComponent,
        MilestoneDeleteDialogComponent,
        MilestoneDeletePopupComponent
    ],
    entryComponents: [MilestoneComponent, MilestoneUpdateComponent, MilestoneDeleteDialogComponent, MilestoneDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularMilestoneModule {}
