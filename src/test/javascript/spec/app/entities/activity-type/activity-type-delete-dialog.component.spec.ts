/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TestangularTestModule } from '../../../test.module';
import { ActivityTypeDeleteDialogComponent } from 'app/entities/activity-type/activity-type-delete-dialog.component';
import { ActivityTypeService } from 'app/entities/activity-type/activity-type.service';

describe('Component Tests', () => {
    describe('ActivityType Management Delete Component', () => {
        let comp: ActivityTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ActivityTypeDeleteDialogComponent>;
        let service: ActivityTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ActivityTypeDeleteDialogComponent]
            })
                .overrideTemplate(ActivityTypeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActivityTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActivityTypeService);
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
