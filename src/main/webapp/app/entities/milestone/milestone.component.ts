import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMilestone } from 'app/shared/model/milestone.model';
import { Principal } from 'app/core';
import { MilestoneService } from './milestone.service';

@Component({
    selector: 'jhi-milestone',
    templateUrl: './milestone.component.html'
})
export class MilestoneComponent implements OnInit, OnDestroy {
    milestones: IMilestone[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private milestoneService: MilestoneService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.milestoneService.query().subscribe(
            (res: HttpResponse<IMilestone[]>) => {
                this.milestones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMilestones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMilestone) {
        return item.id;
    }

    registerChangeInMilestones() {
        this.eventSubscriber = this.eventManager.subscribe('milestoneListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
