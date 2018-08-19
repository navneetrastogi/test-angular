import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVideo } from 'app/shared/model/video.model';

type EntityResponseType = HttpResponse<IVideo>;
type EntityArrayResponseType = HttpResponse<IVideo[]>;

@Injectable({ providedIn: 'root' })
export class VideoService {
    private resourceUrl = SERVER_API_URL + 'api/videos';

    constructor(private http: HttpClient) {}

    create(video: IVideo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(video);
        return this.http
            .post<IVideo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(video: IVideo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(video);
        return this.http
            .put<IVideo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVideo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVideo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(video: IVideo): IVideo {
        const copy: IVideo = Object.assign({}, video, {
            uploadedDate: video.uploadedDate != null && video.uploadedDate.isValid() ? video.uploadedDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.uploadedDate = res.body.uploadedDate != null ? moment(res.body.uploadedDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((video: IVideo) => {
            video.uploadedDate = video.uploadedDate != null ? moment(video.uploadedDate) : null;
        });
        return res;
    }
}
