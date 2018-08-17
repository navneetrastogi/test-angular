/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { KudosDetailComponent } from 'app/entities/kudos/kudos-detail.component';
import { Kudos } from 'app/shared/model/kudos.model';

describe('Component Tests', () => {
    describe('Kudos Management Detail Component', () => {
        let comp: KudosDetailComponent;
        let fixture: ComponentFixture<KudosDetailComponent>;
        const route = ({ data: of({ kudos: new Kudos(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KudosDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KudosDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.kudos).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
