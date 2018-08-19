import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeline } from 'app/shared/model/timeline.model';

type EntityResponseType = HttpResponse<ITimeline>;
type EntityArrayResponseType = HttpResponse<ITimeline[]>;

@Injectable({ providedIn: 'root' })
export class TimelineService {
    private resourceUrl = SERVER_API_URL + 'api/timelines';

    constructor(private http: HttpClient) {}

    create(timeline: ITimeline): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(timeline);
        return this.http
            .post<ITimeline>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(timeline: ITimeline): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(timeline);
        return this.http
            .put<ITimeline>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITimeline>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITimeline[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(timeline: ITimeline): ITimeline {
        const copy: ITimeline = Object.assign({}, timeline, {
            date: timeline.date != null && timeline.date.isValid() ? timeline.date.format(DATE_FORMAT) : null,
            isVisible: timeline.isVisible != null && timeline.isVisible.isValid() ? timeline.isVisible.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        res.body.isVisible = res.body.isVisible != null ? moment(res.body.isVisible) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((timeline: ITimeline) => {
            timeline.date = timeline.date != null ? moment(timeline.date) : null;
            timeline.isVisible = timeline.isVisible != null ? moment(timeline.isVisible) : null;
        });
        return res;
    }
}
