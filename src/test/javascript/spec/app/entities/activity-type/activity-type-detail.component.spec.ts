/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestangularTestModule } from '../../../test.module';
import { ActivityTypeDetailComponent } from 'app/entities/activity-type/activity-type-detail.component';
import { ActivityType } from 'app/shared/model/activity-type.model';

describe('Component Tests', () => {
    describe('ActivityType Management Detail Component', () => {
        let comp: ActivityTypeDetailComponent;
        let fixture: ComponentFixture<ActivityTypeDetailComponent>;
        const route = ({ data: of({ activityType: new ActivityType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [ActivityTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ActivityTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActivityTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.activityType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
