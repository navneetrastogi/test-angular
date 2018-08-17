import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IKudos } from 'app/shared/model/kudos.model';
import { Principal } from 'app/core';
import { KudosService } from './kudos.service';

@Component({
    selector: 'jhi-kudos',
    templateUrl: './kudos.component.html'
})
export class KudosComponent implements OnInit, OnDestroy {
    kudos: IKudos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private kudosService: KudosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.kudosService.query().subscribe(
            (res: HttpResponse<IKudos[]>) => {
                this.kudos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInKudos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IKudos) {
        return item.id;
    }

    registerChangeInKudos() {
        this.eventSubscriber = this.eventManager.subscribe('kudosListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
