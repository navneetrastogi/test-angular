/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { IllnessRecordComponent } from 'app/entities/illness-record/illness-record.component';
import { IllnessRecordService } from 'app/entities/illness-record/illness-record.service';
import { IllnessRecord } from 'app/shared/model/illness-record.model';

describe('Component Tests', () => {
    describe('IllnessRecord Management Component', () => {
        let comp: IllnessRecordComponent;
        let fixture: ComponentFixture<IllnessRecordComponent>;
        let service: IllnessRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [IllnessRecordComponent],
                providers: []
            })
                .overrideTemplate(IllnessRecordComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IllnessRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IllnessRecordService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IllnessRecord(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.illnessRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
