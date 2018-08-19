import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeacher } from 'app/shared/model/teacher.model';

type EntityResponseType = HttpResponse<ITeacher>;
type EntityArrayResponseType = HttpResponse<ITeacher[]>;

@Injectable({ providedIn: 'root' })
export class TeacherService {
    private resourceUrl = SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient) {}

    create(teacher: ITeacher): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teacher);
        return this.http
            .post<ITeacher>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(teacher: ITeacher): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(teacher);
        return this.http
            .put<ITeacher>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITeacher>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITeacher[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(teacher: ITeacher): ITeacher {
        const copy: ITeacher = Object.assign({}, teacher, {
            createdOn: teacher.createdOn != null && teacher.createdOn.isValid() ? teacher.createdOn.format(DATE_FORMAT) : null,
            joiningDate: teacher.joiningDate != null && teacher.joiningDate.isValid() ? teacher.joiningDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.joiningDate = res.body.joiningDate != null ? moment(res.body.joiningDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((teacher: ITeacher) => {
            teacher.createdOn = teacher.createdOn != null ? moment(teacher.createdOn) : null;
            teacher.joiningDate = teacher.joiningDate != null ? moment(teacher.joiningDate) : null;
        });
        return res;
    }
}
