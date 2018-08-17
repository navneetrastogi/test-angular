/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { KudosUpdateComponent } from 'app/entities/kudos/kudos-update.component';
import { KudosService } from 'app/entities/kudos/kudos.service';
import { Kudos } from 'app/shared/model/kudos.model';

describe('Component Tests', () => {
    describe('Kudos Management Update Component', () => {
        let comp: KudosUpdateComponent;
        let fixture: ComponentFixture<KudosUpdateComponent>;
        let service: KudosService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosUpdateComponent]
            })
                .overrideTemplate(KudosUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KudosUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KudosService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Kudos(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.kudos = entity;
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
                    const entity = new Kudos();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.kudos = entity;
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
