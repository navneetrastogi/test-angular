import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHoliday } from 'app/shared/model/holiday.model';

type EntityResponseType = HttpResponse<IHoliday>;
type EntityArrayResponseType = HttpResponse<IHoliday[]>;

@Injectable({ providedIn: 'root' })
export class HolidayService {
    private resourceUrl = SERVER_API_URL + 'api/holidays';

    constructor(private http: HttpClient) {}

    create(holiday: IHoliday): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(holiday);
        return this.http
            .post<IHoliday>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(holiday: IHoliday): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(holiday);
        return this.http
            .put<IHoliday>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHoliday>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHoliday[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(holiday: IHoliday): IHoliday {
        const copy: IHoliday = Object.assign({}, holiday, {
            date: holiday.date != null && holiday.date.isValid() ? holiday.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((holiday: IHoliday) => {
            holiday.date = holiday.date != null ? moment(holiday.date) : null;
        });
        return res;
    }
}
