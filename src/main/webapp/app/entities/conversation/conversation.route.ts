import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conversation } from 'app/shared/model/conversation.model';
import { ConversationService } from './conversation.service';
import { ConversationComponent } from './conversation.component';
import { ConversationDetailComponent } from './conversation-detail.component';
import { ConversationUpdateComponent } from './conversation-update.component';
import { ConversationDeletePopupComponent } from './conversation-delete-dialog.component';
import { IConversation } from 'app/shared/model/conversation.model';

@Injectable({ providedIn: 'root' })
export class ConversationResolve implements Resolve<IConversation> {
    constructor(private service: ConversationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((conversation: HttpResponse<Conversation>) => conversation.body));
        }
        return of(new Conversation());
    }
}

export const conversationRoute: Routes = [
    {
        path: 'conversation',
        component: ConversationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conversation/:id/view',
        component: ConversationDetailComponent,
        resolve: {
            conversation: ConversationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conversation/new',
        component: ConversationUpdateComponent,
        resolve: {
            conversation: ConversationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conversation/:id/edit',
        component: ConversationUpdateComponent,
        resolve: {
            conversation: ConversationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const conversationPopupRoute: Routes = [
    {
        path: 'conversation/:id/delete',
        component: ConversationDeletePopupComponent,
        resolve: {
            conversation: ConversationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'testangularApp.conversation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
