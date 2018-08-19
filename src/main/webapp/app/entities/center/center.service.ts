import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICenter } from 'app/shared/model/center.model';

type EntityResponseType = HttpResponse<ICenter>;
type EntityArrayResponseType = HttpResponse<ICenter[]>;

@Injectable({ providedIn: 'root' })
export class CenterService {
    private resourceUrl = SERVER_API_URL + 'api/centers';

    constructor(private http: HttpClient) {}

    create(center: ICenter): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(center);
        return this.http
            .post<ICenter>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(center: ICenter): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(center);
        return this.http
            .put<ICenter>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICenter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICenter[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(center: ICenter): ICenter {
        const copy: ICenter = Object.assign({}, center, {
            createdOn: center.createdOn != null && center.createdOn.isValid() ? center.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn:
                center.lastModifiedOn != null && center.lastModifiedOn.isValid() ? center.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((center: ICenter) => {
            center.createdOn = center.createdOn != null ? moment(center.createdOn) : null;
            center.lastModifiedOn = center.lastModifiedOn != null ? moment(center.lastModifiedOn) : null;
        });
        return res;
    }
}
