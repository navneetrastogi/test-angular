import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    ImmunizationRecordComponent,
    ImmunizationRecordDetailComponent,
    ImmunizationRecordUpdateComponent,
    ImmunizationRecordDeletePopupComponent,
    ImmunizationRecordDeleteDialogComponent,
    immunizationRecordRoute,
    immunizationRecordPopupRoute
} from './';

const ENTITY_STATES = [...immunizationRecordRoute, ...immunizationRecordPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImmunizationRecordComponent,
        ImmunizationRecordDetailComponent,
        ImmunizationRecordUpdateComponent,
        ImmunizationRecordDeleteDialogComponent,
        ImmunizationRecordDeletePopupComponent
    ],
    entryComponents: [
        ImmunizationRecordComponent,
        ImmunizationRecordUpdateComponent,
        ImmunizationRecordDeleteDialogComponent,
        ImmunizationRecordDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularImmunizationRecordModule {}
