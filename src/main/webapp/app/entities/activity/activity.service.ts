import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IActivity } from 'app/shared/model/activity.model';

type EntityResponseType = HttpResponse<IActivity>;
type EntityArrayResponseType = HttpResponse<IActivity[]>;

@Injectable({ providedIn: 'root' })
export class ActivityService {
    private resourceUrl = SERVER_API_URL + 'api/activities';

    constructor(private http: HttpClient) {}

    create(activity: IActivity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(activity);
        return this.http
            .post<IActivity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(activity: IActivity): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(activity);
        return this.http
            .put<IActivity>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IActivity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IActivity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(activity: IActivity): IActivity {
        const copy: IActivity = Object.assign({}, activity, {
            activityDate:
                activity.activityDate != null && activity.activityDate.isValid() ? activity.activityDate.format(DATE_FORMAT) : null,
            createdOn: activity.createdOn != null && activity.createdOn.isValid() ? activity.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn:
                activity.lastModifiedOn != null && activity.lastModifiedOn.isValid() ? activity.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.activityDate = res.body.activityDate != null ? moment(res.body.activityDate) : null;
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((activity: IActivity) => {
            activity.activityDate = activity.activityDate != null ? moment(activity.activityDate) : null;
            activity.createdOn = activity.createdOn != null ? moment(activity.createdOn) : null;
            activity.lastModifiedOn = activity.lastModifiedOn != null ? moment(activity.lastModifiedOn) : null;
        });
        return res;
    }
}
