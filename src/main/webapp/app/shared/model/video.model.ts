import { Moment } from 'moment';
import { IEvent } from 'app/shared/model//event.model';
import { IActivity } from 'app/shared/model//activity.model';

export interface IVideo {
    id?: number;
    uploadedDate?: Moment;
    url?: string;
    event?: IEvent;
    activity?: IActivity;
}

export class Video implements IVideo {
    constructor(
        public id?: number,
        public uploadedDate?: Moment,
        public url?: string,
        public event?: IEvent,
        public activity?: IActivity
    ) {}
}
