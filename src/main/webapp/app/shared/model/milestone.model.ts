import { Moment } from 'moment';
import { IMilestoneRecord } from 'app/shared/model//milestone-record.model';

export interface IMilestone {
    id?: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    milestoneRecords?: IMilestoneRecord[];
}

export class Milestone implements IMilestone {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public imageUrl?: string,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public milestoneRecords?: IMilestoneRecord[]
    ) {}
}
