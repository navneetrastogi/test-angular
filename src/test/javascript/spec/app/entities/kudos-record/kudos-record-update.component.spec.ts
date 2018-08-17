/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { KudosRecordUpdateComponent } from 'app/entities/kudos-record/kudos-record-update.component';
import { KudosRecordService } from 'app/entities/kudos-record/kudos-record.service';
import { KudosRecord } from 'app/shared/model/kudos-record.model';

describe('Component Tests', () => {
    describe('KudosRecord Management Update Component', () => {
        let comp: KudosRecordUpdateComponent;
        let fixture: ComponentFixture<KudosRecordUpdateComponent>;
        let service: KudosRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosRecordUpdateComponent]
            })
                .overrideTemplate(KudosRecordUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KudosRecordUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KudosRecordService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new KudosRecord(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.kudosRecord = entity;
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
                    const entity = new KudosRecord();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.kudosRecord = entity;
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
