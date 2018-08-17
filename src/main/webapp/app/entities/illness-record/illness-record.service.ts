import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIllnessRecord } from 'app/shared/model/illness-record.model';

type EntityResponseType = HttpResponse<IIllnessRecord>;
type EntityArrayResponseType = HttpResponse<IIllnessRecord[]>;

@Injectable({ providedIn: 'root' })
export class IllnessRecordService {
    private resourceUrl = SERVER_API_URL + 'api/illness-records';

    constructor(private http: HttpClient) {}

    create(illnessRecord: IIllnessRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(illnessRecord);
        return this.http
            .post<IIllnessRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(illnessRecord: IIllnessRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(illnessRecord);
        return this.http
            .put<IIllnessRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIllnessRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIllnessRecord[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(illnessRecord: IIllnessRecord): IIllnessRecord {
        const copy: IIllnessRecord = Object.assign({}, illnessRecord, {
            createdOn:
                illnessRecord.createdOn != null && illnessRecord.createdOn.isValid() ? illnessRecord.createdOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((illnessRecord: IIllnessRecord) => {
            illnessRecord.createdOn = illnessRecord.createdOn != null ? moment(illnessRecord.createdOn) : null;
        });
        return res;
    }
}
