/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { ParentComponent } from 'app/entities/parent/parent.component';
import { ParentService } from 'app/entities/parent/parent.service';
import { Parent } from 'app/shared/model/parent.model';

describe('Component Tests', () => {
    describe('Parent Management Component', () => {
        let comp: ParentComponent;
        let fixture: ComponentFixture<ParentComponent>;
        let service: ParentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ParentComponent],
                providers: []
            })
                .overrideTemplate(ParentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Parent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.parents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
