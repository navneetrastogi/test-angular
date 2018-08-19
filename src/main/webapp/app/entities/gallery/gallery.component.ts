import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGallery } from 'app/shared/model/gallery.model';
import { Principal } from 'app/core';
import { GalleryService } from './gallery.service';

@Component({
    selector: 'jhi-gallery',
    templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit, OnDestroy {
    galleries: IGallery[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private galleryService: GalleryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.galleryService.query().subscribe(
            (res: HttpResponse<IGallery[]>) => {
                this.galleries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGalleries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGallery) {
        return item.id;
    }

    registerChangeInGalleries() {
        this.eventSubscriber = this.eventManager.subscribe('galleryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
