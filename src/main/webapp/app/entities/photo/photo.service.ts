import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPhoto } from 'app/shared/model/photo.model';

type EntityResponseType = HttpResponse<IPhoto>;
type EntityArrayResponseType = HttpResponse<IPhoto[]>;

@Injectable({ providedIn: 'root' })
export class PhotoService {
    private resourceUrl = SERVER_API_URL + 'api/photos';

    constructor(private http: HttpClient) {}

    create(photo: IPhoto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(photo);
        return this.http
            .post<IPhoto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(photo: IPhoto): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(photo);
        return this.http
            .put<IPhoto>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPhoto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPhoto[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(photo: IPhoto): IPhoto {
        const copy: IPhoto = Object.assign({}, photo, {
            date: photo.date != null && photo.date.isValid() ? photo.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((photo: IPhoto) => {
            photo.date = photo.date != null ? moment(photo.date) : null;
        });
        return res;
    }
}
