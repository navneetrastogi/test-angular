/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { ImmunizationRecordDetailComponent } from 'app/entities/immunization-record/immunization-record-detail.component';
import { ImmunizationRecord } from 'app/shared/model/immunization-record.model';

describe('Component Tests', () => {
    describe('ImmunizationRecord Management Detail Component', () => {
        let comp: ImmunizationRecordDetailComponent;
        let fixture: ComponentFixture<ImmunizationRecordDetailComponent>;
        const route = ({ data: of({ immunizationRecord: new ImmunizationRecord(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ImmunizationRecordDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImmunizationRecordDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImmunizationRecordDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.immunizationRecord).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
