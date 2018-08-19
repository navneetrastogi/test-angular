/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestangularTestModule } from '../../../test.module';
import { ImmunizationRecordDeleteDialogComponent } from 'app/entities/immunization-record/immunization-record-delete-dialog.component';
import { ImmunizationRecordService } from 'app/entities/immunization-record/immunization-record.service';

describe('Component Tests', () => {
    describe('ImmunizationRecord Management Delete Component', () => {
        let comp: ImmunizationRecordDeleteDialogComponent;
        let fixture: ComponentFixture<ImmunizationRecordDeleteDialogComponent>;
        let service: ImmunizationRecordService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ImmunizationRecordDeleteDialogComponent]
            })
                .overrideTemplate(ImmunizationRecordDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImmunizationRecordDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImmunizationRecordService);
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