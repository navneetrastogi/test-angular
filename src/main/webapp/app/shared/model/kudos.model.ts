import { Moment } from 'moment';
import { IKudosRecord } from 'app/shared/model//kudos-record.model';

export interface IKudos {
    id?: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    kudosRecords?: IKudosRecord[];
}

export class Kudos implements IKudos {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public imageUrl?: string,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public kudosRecords?: IKudosRecord[]
    ) {}
}
