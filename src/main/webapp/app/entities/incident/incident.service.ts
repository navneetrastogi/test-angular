import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIncident } from 'app/shared/model/incident.model';

type EntityResponseType = HttpResponse<IIncident>;
type EntityArrayResponseType = HttpResponse<IIncident[]>;

@Injectable({ providedIn: 'root' })
export class IncidentService {
    private resourceUrl = SERVER_API_URL + 'api/incidents';

    constructor(private http: HttpClient) {}

    create(incident: IIncident): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(incident);
        return this.http
            .post<IIncident>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(incident: IIncident): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(incident);
        return this.http
            .put<IIncident>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIncident>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIncident[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(incident: IIncident): IIncident {
        const copy: IIncident = Object.assign({}, incident, {
            date: incident.date != null && incident.date.isValid() ? incident.date.format(DATE_FORMAT) : null,
            createdOn: incident.createdOn != null && incident.createdOn.isValid() ? incident.createdOn.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((incident: IIncident) => {
            incident.date = incident.date != null ? moment(incident.date) : null;
            incident.createdOn = incident.createdOn != null ? moment(incident.createdOn) : null;
        });
        return res;
    }
}
