import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhoto } from 'app/shared/model/photo.model';

@Component({
    selector: 'jhi-photo-detail',
    templateUrl: './photo-detail.component.html'
})
export class PhotoDetailComponent implements OnInit {
    photo: IPhoto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ photo }) => {
            this.photo = photo;
        });
    }

    previousState() {
        window.history.back();
    }
}
