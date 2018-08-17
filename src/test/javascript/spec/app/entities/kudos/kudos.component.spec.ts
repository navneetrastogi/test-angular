/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { KudosComponent } from 'app/entities/kudos/kudos.component';
import { KudosService } from 'app/entities/kudos/kudos.service';
import { Kudos } from 'app/shared/model/kudos.model';

describe('Component Tests', () => {
    describe('Kudos Management Component', () => {
        let comp: KudosComponent;
        let fixture: ComponentFixture<KudosComponent>;
        let service: KudosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosComponent],
                providers: []
            })
                .overrideTemplate(KudosComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KudosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KudosService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Kudos(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.kudos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
