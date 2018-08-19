import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    CenterComponent,
    CenterDetailComponent,
    CenterUpdateComponent,
    CenterDeletePopupComponent,
    CenterDeleteDialogComponent,
    centerRoute,
    centerPopupRoute
} from './';

const ENTITY_STATES = [...centerRoute, ...centerPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CenterComponent, CenterDetailComponent, CenterUpdateComponent, CenterDeleteDialogComponent, CenterDeletePopupComponent],
    entryComponents: [CenterComponent, CenterUpdateComponent, CenterDeleteDialogComponent, CenterDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularCenterModule {}
