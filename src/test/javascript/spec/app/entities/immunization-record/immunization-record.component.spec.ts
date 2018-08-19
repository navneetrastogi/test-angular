/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { ImmunizationRecordComponent } from 'app/entities/immunization-record/immunization-record.component';
import { ImmunizationRecordService } from 'app/entities/immunization-record/immunization-record.service';
import { ImmunizationRecord } from 'app/shared/model/immunization-record.model';

describe('Component Tests', () => {
    describe('ImmunizationRecord Management Component', () => {
        let comp: ImmunizationRecordComponent;
        let fixture: ComponentFixture<ImmunizationRecordComponent>;
        let service: ImmunizationRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ImmunizationRecordComponent],
                providers: []
            })
                .overrideTemplate(ImmunizationRecordComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImmunizationRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImmunizationRecordService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ImmunizationRecord(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.immunizationRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
