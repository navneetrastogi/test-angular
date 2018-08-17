/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { KudosRecordDetailComponent } from 'app/entities/kudos-record/kudos-record-detail.component';
import { KudosRecord } from 'app/shared/model/kudos-record.model';

describe('Component Tests', () => {
    describe('KudosRecord Management Detail Component', () => {
        let comp: KudosRecordDetailComponent;
        let fixture: ComponentFixture<KudosRecordDetailComponent>;
        const route = ({ data: of({ kudosRecord: new KudosRecord(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [KudosRecordDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(KudosRecordDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(KudosRecordDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.kudosRecord).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
