/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { ImmunizationRecordUpdateComponent } from 'app/entities/immunization-record/immunization-record-update.component';
import { ImmunizationRecordService } from 'app/entities/immunization-record/immunization-record.service';
import { ImmunizationRecord } from 'app/shared/model/immunization-record.model';

describe('Component Tests', () => {
    describe('ImmunizationRecord Management Update Component', () => {
        let comp: ImmunizationRecordUpdateComponent;
        let fixture: ComponentFixture<ImmunizationRecordUpdateComponent>;
        let service: ImmunizationRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ImmunizationRecordUpdateComponent]
            })
                .overrideTemplate(ImmunizationRecordUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImmunizationRecordUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImmunizationRecordService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ImmunizationRecord(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.immunizationRecord = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ImmunizationRecord();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.immunizationRecord = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
