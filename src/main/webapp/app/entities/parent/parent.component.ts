import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParent } from 'app/shared/model/parent.model';
import { Principal } from 'app/core';
import { ParentService } from './parent.service';

@Component({
    selector: 'jhi-parent',
    templateUrl: './parent.component.html'
})
export class ParentComponent implements OnInit, OnDestroy {
    parents: IParent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private parentService: ParentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.parentService.query().subscribe(
            (res: HttpResponse<IParent[]>) => {
                this.parents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParent) {
        return item.id;
    }

    registerChangeInParents() {
        this.eventSubscriber = this.eventManager.subscribe('parentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
