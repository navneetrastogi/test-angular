import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGallery } from 'app/shared/model/gallery.model';

@Component({
    selector: 'jhi-gallery-detail',
    templateUrl: './gallery-detail.component.html'
})
export class GalleryDetailComponent implements OnInit {
    gallery: IGallery;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gallery }) => {
            this.gallery = gallery;
        });
    }

    previousState() {
        window.history.back();
    }
}
