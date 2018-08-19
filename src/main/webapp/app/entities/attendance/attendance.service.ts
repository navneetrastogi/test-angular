import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAttendance } from 'app/shared/model/attendance.model';

type EntityResponseType = HttpResponse<IAttendance>;
type EntityArrayResponseType = HttpResponse<IAttendance[]>;

@Injectable({ providedIn: 'root' })
export class AttendanceService {
    private resourceUrl = SERVER_API_URL + 'api/attendances';

    constructor(private http: HttpClient) {}

    create(attendance: IAttendance): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(attendance);
        return this.http
            .post<IAttendance>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(attendance: IAttendance): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(attendance);
        return this.http
            .put<IAttendance>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAttendance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAttendance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(attendance: IAttendance): IAttendance {
        const copy: IAttendance = Object.assign({}, attendance, {
            datetime: attendance.datetime != null && attendance.datetime.isValid() ? attendance.datetime.format(DATE_FORMAT) : null,
            createdOn: attendance.createdOn != null && attendance.createdOn.isValid() ? attendance.createdOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.datetime = res.body.datetime != null ? moment(res.body.datetime) : null;
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((attendance: IAttendance) => {
            attendance.datetime = attendance.datetime != null ? moment(attendance.datetime) : null;
            attendance.createdOn = attendance.createdOn != null ? moment(attendance.createdOn) : null;
        });
        return res;
    }
}
