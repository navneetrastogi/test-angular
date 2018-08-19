import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    KudosRecordComponent,
    KudosRecordDetailComponent,
    KudosRecordUpdateComponent,
    KudosRecordDeletePopupComponent,
    KudosRecordDeleteDialogComponent,
    kudosRecordRoute,
    kudosRecordPopupRoute
} from './';

const ENTITY_STATES = [...kudosRecordRoute, ...kudosRecordPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        KudosRecordComponent,
        KudosRecordDetailComponent,
        KudosRecordUpdateComponent,
        KudosRecordDeleteDialogComponent,
        KudosRecordDeletePopupComponent
    ],
    entryComponents: [KudosRecordComponent, KudosRecordUpdateComponent, KudosRecordDeleteDialogComponent, KudosRecordDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularKudosRecordModule {}
