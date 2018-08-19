import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFeature } from 'app/shared/model/feature.model';
import { Principal } from 'app/core';
import { FeatureService } from './feature.service';

@Component({
    selector: 'jhi-feature',
    templateUrl: './feature.component.html'
})
export class FeatureComponent implements OnInit, OnDestroy {
    features: IFeature[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private featureService: FeatureService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.featureService.query().subscribe(
            (res: HttpResponse<IFeature[]>) => {
                this.features = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFeatures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFeature) {
        return item.id;
    }

    registerChangeInFeatures() {
        this.eventSubscriber = this.eventManager.subscribe('featureListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
