import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';

type EntityResponseType = HttpResponse<IImmunizationRecord>;
type EntityArrayResponseType = HttpResponse<IImmunizationRecord[]>;

@Injectable({ providedIn: 'root' })
export class ImmunizationRecordService {
    private resourceUrl = SERVER_API_URL + 'api/immunization-records';

    constructor(private http: HttpClient) {}

    create(immunizationRecord: IImmunizationRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(immunizationRecord);
        return this.http
            .post<IImmunizationRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(immunizationRecord: IImmunizationRecord): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(immunizationRecord);
        return this.http
            .put<IImmunizationRecord>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IImmunizationRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IImmunizationRecord[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(immunizationRecord: IImmunizationRecord): IImmunizationRecord {
        const copy: IImmunizationRecord = Object.assign({}, immunizationRecord, {
            createdOn:
                immunizationRecord.createdOn != null && immunizationRecord.createdOn.isValid()
                    ? immunizationRecord.createdOn.format(DATE_FORMAT)
                    : null,
            vaccinationDoneOn:
                immunizationRecord.vaccinationDoneOn != null && immunizationRecord.vaccinationDoneOn.isValid()
                    ? immunizationRecord.vaccinationDoneOn.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.vaccinationDoneOn = res.body.vaccinationDoneOn != null ? moment(res.body.vaccinationDoneOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((immunizationRecord: IImmunizationRecord) => {
            immunizationRecord.createdOn = immunizationRecord.createdOn != null ? moment(immunizationRecord.createdOn) : null;
            immunizationRecord.vaccinationDoneOn =
                immunizationRecord.vaccinationDoneOn != null ? moment(immunizationRecord.vaccinationDoneOn) : null;
        });
        return res;
    }
}
