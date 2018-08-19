import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConversation } from 'app/shared/model/conversation.model';
import { Principal } from 'app/core';
import { ConversationService } from './conversation.service';

@Component({
    selector: 'jhi-conversation',
    templateUrl: './conversation.component.html'
})
export class ConversationComponent implements OnInit, OnDestroy {
    conversations: IConversation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private conversationService: ConversationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.conversationService.query().subscribe(
            (res: HttpResponse<IConversation[]>) => {
                this.conversations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConversations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConversation) {
        return item.id;
    }

    registerChangeInConversations() {
        this.eventSubscriber = this.eventManager.subscribe('conversationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
