import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    IllnessRecordComponent,
    IllnessRecordDetailComponent,
    IllnessRecordUpdateComponent,
    IllnessRecordDeletePopupComponent,
    IllnessRecordDeleteDialogComponent,
    illnessRecordRoute,
    illnessRecordPopupRoute
} from './';

const ENTITY_STATES = [...illnessRecordRoute, ...illnessRecordPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IllnessRecordComponent,
        IllnessRecordDetailComponent,
        IllnessRecordUpdateComponent,
        IllnessRecordDeleteDialogComponent,
        IllnessRecordDeletePopupComponent
    ],
    entryComponents: [
        IllnessRecordComponent,
        IllnessRecordUpdateComponent,
        IllnessRecordDeleteDialogComponent,
        IllnessRecordDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularIllnessRecordModule {}
