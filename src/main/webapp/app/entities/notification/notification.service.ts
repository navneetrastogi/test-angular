import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INotification } from 'app/shared/model/notification.model';

type EntityResponseType = HttpResponse<INotification>;
type EntityArrayResponseType = HttpResponse<INotification[]>;

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private resourceUrl = SERVER_API_URL + 'api/notifications';

    constructor(private http: HttpClient) {}

    create(notification: INotification): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(notification);
        return this.http
            .post<INotification>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(notification: INotification): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(notification);
        return this.http
            .put<INotification>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INotification>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INotification[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(notification: INotification): INotification {
        const copy: INotification = Object.assign({}, notification, {
            date: notification.date != null && notification.date.isValid() ? notification.date.format(DATE_FORMAT) : null,
            createdOn:
                notification.createdOn != null && notification.createdOn.isValid() ? notification.createdOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((notification: INotification) => {
            notification.date = notification.date != null ? moment(notification.date) : null;
            notification.createdOn = notification.createdOn != null ? moment(notification.createdOn) : null;
        });
        return res;
    }
}
