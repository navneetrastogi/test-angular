import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentProfile } from 'app/shared/model/student-profile.model';

type EntityResponseType = HttpResponse<IStudentProfile>;
type EntityArrayResponseType = HttpResponse<IStudentProfile[]>;

@Injectable({ providedIn: 'root' })
export class StudentProfileService {
    private resourceUrl = SERVER_API_URL + 'api/student-profiles';

    constructor(private http: HttpClient) {}

    create(studentProfile: IStudentProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(studentProfile);
        return this.http
            .post<IStudentProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(studentProfile: IStudentProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(studentProfile);
        return this.http
            .put<IStudentProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStudentProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStudentProfile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(studentProfile: IStudentProfile): IStudentProfile {
        const copy: IStudentProfile = Object.assign({}, studentProfile, {
            birthDate:
                studentProfile.birthDate != null && studentProfile.birthDate.isValid() ? studentProfile.birthDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((studentProfile: IStudentProfile) => {
            studentProfile.birthDate = studentProfile.birthDate != null ? moment(studentProfile.birthDate) : null;
        });
        return res;
    }
}
