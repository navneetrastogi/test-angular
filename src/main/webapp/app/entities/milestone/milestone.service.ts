import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMilestone } from 'app/shared/model/milestone.model';

type EntityResponseType = HttpResponse<IMilestone>;
type EntityArrayResponseType = HttpResponse<IMilestone[]>;

@Injectable({ providedIn: 'root' })
export class MilestoneService {
    private resourceUrl = SERVER_API_URL + 'api/milestones';

    constructor(private http: HttpClient) {}

    create(milestone: IMilestone): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(milestone);
        return this.http
            .post<IMilestone>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(milestone: IMilestone): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(milestone);
        return this.http
            .put<IMilestone>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMilestone>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMilestone[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(milestone: IMilestone): IMilestone {
        const copy: IMilestone = Object.assign({}, milestone, {
            createdOn: milestone.createdOn != null && milestone.createdOn.isValid() ? milestone.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn:
                milestone.lastModifiedOn != null && milestone.lastModifiedOn.isValid() ? milestone.lastModifiedOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((milestone: IMilestone) => {
            milestone.createdOn = milestone.createdOn != null ? moment(milestone.createdOn) : null;
            milestone.lastModifiedOn = milestone.lastModifiedOn != null ? moment(milestone.lastModifiedOn) : null;
        });
        return res;
    }
}
