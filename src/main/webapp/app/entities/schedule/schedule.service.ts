import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchedule } from 'app/shared/model/schedule.model';

type EntityResponseType = HttpResponse<ISchedule>;
type EntityArrayResponseType = HttpResponse<ISchedule[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    private resourceUrl = SERVER_API_URL + 'api/schedules';

    constructor(private http: HttpClient) {}

    create(schedule: ISchedule): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .post<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(schedule: ISchedule): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .put<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchedule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(schedule: ISchedule): ISchedule {
        const copy: ISchedule = Object.assign({}, schedule, {
            createdOn: schedule.createdOn != null && schedule.createdOn.isValid() ? schedule.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn:
                schedule.lastModifiedOn != null && schedule.lastModifiedOn.isValid() ? schedule.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((schedule: ISchedule) => {
            schedule.createdOn = schedule.createdOn != null ? moment(schedule.createdOn) : null;
            schedule.lastModifiedOn = schedule.lastModifiedOn != null ? moment(schedule.lastModifiedOn) : null;
        });
        return res;
    }
}
