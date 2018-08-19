import { Moment } from 'moment';
import { IRoom } from 'app/shared/model//room.model';
import { IEvent } from 'app/shared/model//event.model';
import { IActivity } from 'app/shared/model//activity.model';
import { ITimeline } from 'app/shared/model//timeline.model';

export interface ISchedule {
    id?: number;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    rooms?: IRoom[];
    events?: IEvent[];
    activities?: IActivity[];
    timelines?: ITimeline[];
}

export class Schedule implements ISchedule {
    constructor(
        public id?: number,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public rooms?: IRoom[],
        public events?: IEvent[],
        public activities?: IActivity[],
        public timelines?: ITimeline[]
    ) {}
}
