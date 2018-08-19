/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestangularTestModule } from '../../../test.module';
import { KudosRecordDeleteDialogComponent } from 'app/entities/kudos-record/kudos-record-delete-dialog.component';
import { KudosRecordService } from 'app/entities/kudos-record/kudos-record.service';

describe('Component Tests', () => {
    describe('KudosRecord Management Delete Component', () => {
        let comp: KudosRecordDeleteDialogComponent;
        let fixture: ComponentFixture<KudosRecordDeleteDialogComponent>;
        let service: KudosRecordService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosRecordDeleteDialogComponent]
            })
                .overrideTemplate(KudosRecordDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KudosRecordDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KudosRecordService);
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
