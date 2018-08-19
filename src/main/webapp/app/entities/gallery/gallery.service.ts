import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGallery } from 'app/shared/model/gallery.model';

type EntityResponseType = HttpResponse<IGallery>;
type EntityArrayResponseType = HttpResponse<IGallery[]>;

@Injectable({ providedIn: 'root' })
export class GalleryService {
    private resourceUrl = SERVER_API_URL + 'api/galleries';

    constructor(private http: HttpClient) {}

    create(gallery: IGallery): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gallery);
        return this.http
            .post<IGallery>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gallery: IGallery): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gallery);
        return this.http
            .put<IGallery>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGallery>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGallery[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(gallery: IGallery): IGallery {
        const copy: IGallery = Object.assign({}, gallery, {
            createdOn: gallery.createdOn != null && gallery.createdOn.isValid() ? gallery.createdOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((gallery: IGallery) => {
            gallery.createdOn = gallery.createdOn != null ? moment(gallery.createdOn) : null;
        });
        return res;
    }
}