/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestangularTestModule } from '../../../test.module';
import { ParentDeleteDialogComponent } from 'app/entities/parent/parent-delete-dialog.component';
import { ParentService } from 'app/entities/parent/parent.service';

describe('Component Tests', () => {
    describe('Parent Management Delete Component', () => {
        let comp: ParentDeleteDialogComponent;
        let fixture: ComponentFixture<ParentDeleteDialogComponent>;
        let service: ParentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ParentDeleteDialogComponent]
            })
                .overrideTemplate(ParentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ParentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParentService);
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
