/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { IllnessRecordUpdateComponent } from 'app/entities/illness-record/illness-record-update.component';
import { IllnessRecordService } from 'app/entities/illness-record/illness-record.service';
import { IllnessRecord } from 'app/shared/model/illness-record.model';

describe('Component Tests', () => {
    describe('IllnessRecord Management Update Component', () => {
        let comp: IllnessRecordUpdateComponent;
        let fixture: ComponentFixture<IllnessRecordUpdateComponent>;
        let service: IllnessRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [IllnessRecordUpdateComponent]
            })
                .overrideTemplate(IllnessRecordUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IllnessRecordUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IllnessRecordService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IllnessRecord(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.illnessRecord = entity;
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
                    const entity = new IllnessRecord();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.illnessRecord = entity;
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
