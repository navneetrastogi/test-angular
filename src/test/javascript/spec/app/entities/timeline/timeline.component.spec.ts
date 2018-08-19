/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { TimelineComponent } from 'app/entities/timeline/timeline.component';
import { TimelineService } from 'app/entities/timeline/timeline.service';
import { Timeline } from 'app/shared/model/timeline.model';

describe('Component Tests', () => {
    describe('Timeline Management Component', () => {
        let comp: TimelineComponent;
        let fixture: ComponentFixture<TimelineComponent>;
        let service: TimelineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [TimelineComponent],
                providers: []
            })
                .overrideTemplate(TimelineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimelineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimelineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Timeline(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.timelines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
