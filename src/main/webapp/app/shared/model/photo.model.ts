import { Moment } from 'moment';
import { IEvent } from 'app/shared/model//event.model';
import { IActivity } from 'app/shared/model//activity.model';

export interface IPhoto {
    id?: number;
    activityId?: number;
    eventId?: number;
    date?: Moment;
    event?: IEvent;
    activity?: IActivity;
}

export class Photo implements IPhoto {
    constructor(
        public id?: number,
        public activityId?: number,
        public eventId?: number,
        public date?: Moment,
        public event?: IEvent,
        public activity?: IActivity
    ) {}
}
