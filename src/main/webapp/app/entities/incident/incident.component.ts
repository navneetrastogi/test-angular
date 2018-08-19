import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIncident } from 'app/shared/model/incident.model';
import { Principal } from 'app/core';
import { IncidentService } from './incident.service';

@Component({
    selector: 'jhi-incident',
    templateUrl: './incident.component.html'
})
export class IncidentComponent implements OnInit, OnDestroy {
    incidents: IIncident[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private incidentService: IncidentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.incidentService.query().subscribe(
            (res: HttpResponse<IIncident[]>) => {
                this.incidents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIncidents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIncident) {
        return item.id;
    }

    registerChangeInIncidents() {
        this.eventSubscriber = this.eventManager.subscribe('incidentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
