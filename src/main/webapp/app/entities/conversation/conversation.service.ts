import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConversation } from 'app/shared/model/conversation.model';

type EntityResponseType = HttpResponse<IConversation>;
type EntityArrayResponseType = HttpResponse<IConversation[]>;

@Injectable({ providedIn: 'root' })
export class ConversationService {
    private resourceUrl = SERVER_API_URL + 'api/conversations';

    constructor(private http: HttpClient) {}

    create(conversation: IConversation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(conversation);
        return this.http
            .post<IConversation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(conversation: IConversation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(conversation);
        return this.http
            .put<IConversation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConversation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConversation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(conversation: IConversation): IConversation {
        const copy: IConversation = Object.assign({}, conversation, {
            createdOn:
                conversation.createdOn != null && conversation.createdOn.isValid() ? conversation.createdOn.format(DATE_FORMAT) : null,
            sentOn: conversation.sentOn != null && conversation.sentOn.isValid() ? conversation.sentOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.sentOn = res.body.sentOn != null ? moment(res.body.sentOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((conversation: IConversation) => {
            conversation.createdOn = conversation.createdOn != null ? moment(conversation.createdOn) : null;
            conversation.sentOn = conversation.sentOn != null ? moment(conversation.sentOn) : null;
        });
        return res;
    }
}
