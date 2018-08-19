import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    ParentComponent,
    ParentDetailComponent,
    ParentUpdateComponent,
    ParentDeletePopupComponent,
    ParentDeleteDialogComponent,
    parentRoute,
    parentPopupRoute
} from './';

const ENTITY_STATES = [...parentRoute, ...parentPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ParentComponent, ParentDetailComponent, ParentUpdateComponent, ParentDeleteDialogComponent, ParentDeletePopupComponent],
    entryComponents: [ParentComponent, ParentUpdateComponent, ParentDeleteDialogComponent, ParentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularParentModule {}
