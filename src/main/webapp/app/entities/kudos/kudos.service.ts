import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKudos } from 'app/shared/model/kudos.model';

type EntityResponseType = HttpResponse<IKudos>;
type EntityArrayResponseType = HttpResponse<IKudos[]>;

@Injectable({ providedIn: 'root' })
export class KudosService {
    private resourceUrl = SERVER_API_URL + 'api/kudos';

    constructor(private http: HttpClient) {}

    create(kudos: IKudos): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(kudos);
        return this.http
            .post<IKudos>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(kudos: IKudos): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(kudos);
        return this.http
            .put<IKudos>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IKudos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IKudos[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(kudos: IKudos): IKudos {
        const copy: IKudos = Object.assign({}, kudos, {
            createdOn: kudos.createdOn != null && kudos.createdOn.isValid() ? kudos.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn: kudos.lastModifiedOn != null && kudos.lastModifiedOn.isValid() ? kudos.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((kudos: IKudos) => {
            kudos.createdOn = kudos.createdOn != null ? moment(kudos.createdOn) : null;
            kudos.lastModifiedOn = kudos.lastModifiedOn != null ? moment(kudos.lastModifiedOn) : null;
        });
        return res;
    }
}
