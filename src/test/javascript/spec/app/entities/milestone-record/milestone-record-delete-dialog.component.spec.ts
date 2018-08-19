/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestangularTestModule } from '../../../test.module';
import { MilestoneRecordDeleteDialogComponent } from 'app/entities/milestone-record/milestone-record-delete-dialog.component';
import { MilestoneRecordService } from 'app/entities/milestone-record/milestone-record.service';

describe('Component Tests', () => {
    describe('MilestoneRecord Management Delete Component', () => {
        let comp: MilestoneRecordDeleteDialogComponent;
        let fixture: ComponentFixture<MilestoneRecordDeleteDialogComponent>;
        let service: MilestoneRecordService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [MilestoneRecordDeleteDialogComponent]
            })
                .overrideTemplate(MilestoneRecordDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MilestoneRecordDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MilestoneRecordService);
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
