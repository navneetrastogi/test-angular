import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganization } from 'app/shared/model/organization.model';

type EntityResponseType = HttpResponse<IOrganization>;
type EntityArrayResponseType = HttpResponse<IOrganization[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
    private resourceUrl = SERVER_API_URL + 'api/organizations';

    constructor(private http: HttpClient) {}

    create(organization: IOrganization): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organization);
        return this.http
            .post<IOrganization>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(organization: IOrganization): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organization);
        return this.http
            .put<IOrganization>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrganization>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrganization[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(organization: IOrganization): IOrganization {
        const copy: IOrganization = Object.assign({}, organization, {
            createdOn:
                organization.createdOn != null && organization.createdOn.isValid() ? organization.createdOn.format(DATE_FORMAT) : null,
            lastModifiedOn:
                organization.lastModifiedOn != null && organization.lastModifiedOn.isValid()
                    ? organization.lastModifiedOn.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        res.body.lastModifiedOn = res.body.lastModifiedOn != null ? moment(res.body.lastModifiedOn) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((organization: IOrganization) => {
            organization.createdOn = organization.createdOn != null ? moment(organization.createdOn) : null;
            organization.lastModifiedOn = organization.lastModifiedOn != null ? moment(organization.lastModifiedOn) : null;
        });
        return res;
    }
}
