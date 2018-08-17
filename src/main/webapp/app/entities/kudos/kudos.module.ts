import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    KudosComponent,
    KudosDetailComponent,
    KudosUpdateComponent,
    KudosDeletePopupComponent,
    KudosDeleteDialogComponent,
    kudosRoute,
    kudosPopupRoute
} from './';

const ENTITY_STATES = [...kudosRoute, ...kudosPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [KudosComponent, KudosDetailComponent, KudosUpdateComponent, KudosDeleteDialogComponent, KudosDeletePopupComponent],
    entryComponents: [KudosComponent, KudosUpdateComponent, KudosDeleteDialogComponent, KudosDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularKudosModule {}
