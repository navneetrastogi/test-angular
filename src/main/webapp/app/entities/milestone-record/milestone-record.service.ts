import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';

type EntityResponseType = HttpResponse<IMilestoneRecord>;
type EntityArrayResponseType = HttpResponse<IMilestoneRecord[]>;

@Injectable({ providedIn: 'root' })
export class MilestoneRecordService {
    private resourceUrl = SERVER_API_URL + 'api/milestone-records';

    constructor(private http: HttpClient) {}

    create(milestoneRecord: IMilestoneRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(milestoneRecord);
        return this.http
            .post<IMilestoneRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(milestoneRecord: IMilestoneRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(milestoneRecord);
        return this.http
            .put<IMilestoneRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMilestoneRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMilestoneRecord[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(milestoneRecord: IMilestoneRecord): IMilestoneRecord {
        const copy: IMilestoneRecord = Object.assign({}, milestoneRecord, {
            createdOn:
                milestoneRecord.createdOn != null && milestoneRecord.createdOn.isValid()
                    ? milestoneRecord.createdOn.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((milestoneRecord: IMilestoneRecord) => {
            milestoneRecord.createdOn = milestoneRecord.createdOn != null ? moment(milestoneRecord.createdOn) : null;
        });
        return res;
    }
}
