import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKudosRecord } from 'app/shared/model/kudos-record.model';

type EntityResponseType = HttpResponse<IKudosRecord>;
type EntityArrayResponseType = HttpResponse<IKudosRecord[]>;

@Injectable({ providedIn: 'root' })
export class KudosRecordService {
    private resourceUrl = SERVER_API_URL + 'api/kudos-records';

    constructor(private http: HttpClient) {}

    create(kudosRecord: IKudosRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(kudosRecord);
        return this.http
            .post<IKudosRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(kudosRecord: IKudosRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(kudosRecord);
        return this.http
            .put<IKudosRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IKudosRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IKudosRecord[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(kudosRecord: IKudosRecord): IKudosRecord {
        const copy: IKudosRecord = Object.assign({}, kudosRecord, {
            createdOn: kudosRecord.createdOn != null && kudosRecord.createdOn.isValid() ? kudosRecord.createdOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((kudosRecord: IKudosRecord) => {
            kudosRecord.createdOn = kudosRecord.createdOn != null ? moment(kudosRecord.createdOn) : null;
        });
        return res;
    }
}
