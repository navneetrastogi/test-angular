/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { IllnessRecordDetailComponent } from 'app/entities/illness-record/illness-record-detail.component';
import { IllnessRecord } from 'app/shared/model/illness-record.model';

describe('Component Tests', () => {
    describe('IllnessRecord Management Detail Component', () => {
        let comp: IllnessRecordDetailComponent;
        let fixture: ComponentFixture<IllnessRecordDetailComponent>;
        const route = ({ data: of({ illnessRecord: new IllnessRecord(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [IllnessRecordDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IllnessRecordDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IllnessRecordDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.illnessRecord).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
