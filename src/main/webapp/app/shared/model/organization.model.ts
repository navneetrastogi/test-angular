import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';

export interface IOrganization {
    id?: number;
    name?: string;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    centers?: ICenter[];
}

export class Organization implements IOrganization {
    constructor(
        public id?: number,
        public name?: string,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public centers?: ICenter[]
    ) {}
}
