import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPhoto } from 'app/shared/model/photo.model';
import { Principal } from 'app/core';
import { PhotoService } from './photo.service';

@Component({
    selector: 'jhi-photo',
    templateUrl: './photo.component.html'
})
export class PhotoComponent implements OnInit, OnDestroy {
    photos: IPhoto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private photoService: PhotoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.photoService.query().subscribe(
            (res: HttpResponse<IPhoto[]>) => {
                this.photos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPhotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPhoto) {
        return item.id;
    }

    registerChangeInPhotos() {
        this.eventSubscriber = this.eventManager.subscribe('photoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
