/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestangularTestModule } from '../../../test.module';
import { KudosDeleteDialogComponent } from 'app/entities/kudos/kudos-delete-dialog.component';
import { KudosService } from 'app/entities/kudos/kudos.service';

describe('Component Tests', () => {
    describe('Kudos Management Delete Component', () => {
        let comp: KudosDeleteDialogComponent;
        let fixture: ComponentFixture<KudosDeleteDialogComponent>;
        let service: KudosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosDeleteDialogComponent]
            })
                .overrideTemplate(KudosDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KudosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KudosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
