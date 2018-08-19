import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudent } from 'app/shared/model/student.model';

type EntityResponseType = HttpResponse<IStudent>;
type EntityArrayResponseType = HttpResponse<IStudent[]>;

@Injectable({ providedIn: 'root' })
export class StudentService {
    private resourceUrl = SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient) {}

    create(student: IStudent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(student);
        return this.http
            .post<IStudent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(student: IStudent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(student);
        return this.http
            .put<IStudent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStudent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(student: IStudent): IStudent {
        const copy: IStudent = Object.assign({}, student, {
            createdOn: student.createdOn != null && student.createdOn.isValid() ? student.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn:
                student.lastModifiedOn != null && student.lastModifiedOn.isValid() ? student.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((student: IStudent) => {
            student.createdOn = student.createdOn != null ? moment(student.createdOn) : null;
            student.lastModifiedOn = student.lastModifiedOn != null ? moment(student.lastModifiedOn) : null;
        });
        return res;
    }
}
