/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { MilestoneRecordDetailComponent } from 'app/entities/milestone-record/milestone-record-detail.component';
import { MilestoneRecord } from 'app/shared/model/milestone-record.model';

describe('Component Tests', () => {
    describe('MilestoneRecord Management Detail Component', () => {
        let comp: MilestoneRecordDetailComponent;
        let fixture: ComponentFixture<MilestoneRecordDetailComponent>;
        const route = ({ data: of({ milestoneRecord: new MilestoneRecord(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [MilestoneRecordDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MilestoneRecordDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MilestoneRecordDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.milestoneRecord).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
