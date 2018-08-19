/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { KudosRecordComponent } from 'app/entities/kudos-record/kudos-record.component';
import { KudosRecordService } from 'app/entities/kudos-record/kudos-record.service';
import { KudosRecord } from 'app/shared/model/kudos-record.model';

describe('Component Tests', () => {
    describe('KudosRecord Management Component', () => {
        let comp: KudosRecordComponent;
        let fixture: ComponentFixture<KudosRecordComponent>;
        let service: KudosRecordService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosRecordComponent],
                providers: []
            })
                .overrideTemplate(KudosRecordComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KudosRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KudosRecordService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new KudosRecord(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.kudosRecords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
