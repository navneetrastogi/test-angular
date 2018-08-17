import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestangularSharedModule } from 'app/shared';
import {
    HolidayComponent,
    HolidayDetailComponent,
    HolidayUpdateComponent,
    HolidayDeletePopupComponent,
    HolidayDeleteDialogComponent,
    holidayRoute,
    holidayPopupRoute
} from './';

const ENTITY_STATES = [...holidayRoute, ...holidayPopupRoute];

@NgModule({
    imports: [TestangularSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HolidayComponent,
        HolidayDetailComponent,
        HolidayUpdateComponent,
        HolidayDeleteDialogComponent,
        HolidayDeletePopupComponent
    ],
    entryComponents: [HolidayComponent, HolidayUpdateComponent, HolidayDeleteDialogComponent, HolidayDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestangularHolidayModule {}
