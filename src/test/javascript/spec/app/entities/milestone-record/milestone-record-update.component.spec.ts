/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { MilestoneRecordUpdateComponent } from 'app/entities/milestone-record/milestone-record-update.component';
import { MilestoneRecordService } from 'app/entities/milestone-record/milestone-record.service';
import { MilestoneRecord } from 'app/shared/model/milestone-record.model';

describe('Component Tests', () => {
    describe('MilestoneRecord Management Update Component', () => {
        let comp: MilestoneRecordUpdateComponent;
        let fixture: ComponentFixture<MilestoneRecordUpdateComponent>;
        let service: MilestoneRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [MilestoneRecordUpdateComponent]
            })
                .overrideTemplate(MilestoneRecordUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MilestoneRecordUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MilestoneRecordService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MilestoneRecord(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.milestoneRecord = entity;
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
                    const entity = new MilestoneRecord();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.milestoneRecord = entity;
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
