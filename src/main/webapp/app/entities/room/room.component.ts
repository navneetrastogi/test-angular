import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRoom } from 'app/shared/model/room.model';
import { Principal } from 'app/core';
import { RoomService } from './room.service';

@Component({
    selector: 'jhi-room',
    templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit, OnDestroy {
    rooms: IRoom[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roomService: RoomService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.roomService.query().subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRoom) {
        return item.id;
    }

    registerChangeInRooms() {
        this.eventSubscriber = this.eventManager.subscribe('roomListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
