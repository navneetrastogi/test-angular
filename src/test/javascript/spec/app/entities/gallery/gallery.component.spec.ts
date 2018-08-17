/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestangularTestModule } from '../../../test.module';
import { GalleryComponent } from 'app/entities/gallery/gallery.component';
import { GalleryService } from 'app/entities/gallery/gallery.service';
import { Gallery } from 'app/shared/model/gallery.model';

describe('Component Tests', () => {
    describe('Gallery Management Component', () => {
        let comp: GalleryComponent;
        let fixture: ComponentFixture<GalleryComponent>;
        let service: GalleryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestangularTestModule],
                declarations: [GalleryComponent],
                providers: []
            })
                .overrideTemplate(GalleryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GalleryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GalleryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Gallery(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.galleries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
