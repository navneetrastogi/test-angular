/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { TimelineUpdateComponent } from 'app/entities/timeline/timeline-update.component';
import { TimelineService } from 'app/entities/timeline/timeline.service';
import { Timeline } from 'app/shared/model/timeline.model';

describe('Component Tests', () => {
    describe('Timeline Management Update Component', () => {
        let comp: TimelineUpdateComponent;
        let fixture: ComponentFixture<TimelineUpdateComponent>;
        let service: TimelineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [TimelineUpdateComponent]
            })
                .overrideTemplate(TimelineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimelineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Timeline(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.timeline = entity;
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
                    const entity = new Timeline();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.timeline = entity;
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
