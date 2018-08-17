import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRoom } from 'app/shared/model/room.model';

type EntityResponseType = HttpResponse<IRoom>;
type EntityArrayResponseType = HttpResponse<IRoom[]>;

@Injectable({ providedIn: 'root' })
export class RoomService {
    private resourceUrl = SERVER_API_URL + 'api/rooms';

    constructor(private http: HttpClient) {}

    create(room: IRoom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(room);
        return this.http
            .post<IRoom>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(room: IRoom): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(room);
        return this.http
            .put<IRoom>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRoom>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRoom[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(room: IRoom): IRoom {
        const copy: IRoom = Object.assign({}, room, {
            createdOn: room.createdOn != null && room.createdOn.isValid() ? room.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn: room.lastModifiedOn != null && room.lastModifiedOn.isValid() ? room.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((room: IRoom) => {
            room.createdOn = room.createdOn != null ? moment(room.createdOn) : null;
            room.lastModifiedOn = room.lastModifiedOn != null ? moment(room.lastModifiedOn) : null;
        });
        return res;
    }
}
