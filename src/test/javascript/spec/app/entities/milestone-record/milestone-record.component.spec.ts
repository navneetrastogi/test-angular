/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { MilestoneRecordComponent } from 'app/entities/milestone-record/milestone-record.component';
import { MilestoneRecordService } from 'app/entities/milestone-record/milestone-record.service';
import { MilestoneRecord } from 'app/shared/model/milestone-record.model';

describe('Component Tests', () => {
    describe('MilestoneRecord Management Component', () => {
        let comp: MilestoneRecordComponent;
        let fixture: ComponentFixture<MilestoneRecordComponent>;
        let service: MilestoneRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [MilestoneRecordComponent],
                providers: []
            })
                .overrideTemplate(MilestoneRecordComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MilestoneRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MilestoneRecordService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MilestoneRecord(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.milestoneRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
