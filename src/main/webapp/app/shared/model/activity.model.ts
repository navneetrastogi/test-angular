import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model//schedule.model';
import { IActivityType } from 'app/shared/model//activity-type.model';
import { IPhoto } from 'app/shared/model//photo.model';
import { IVideo } from 'app/shared/model//video.model';

export interface IActivity {
    id?: number;
    title?: string;
    description?: string;
    activityImageUrl?: string;
    activityDate?: Moment;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    schedule?: ISchedule;
    activityType?: IActivityType;
    photos?: IPhoto[];
    videos?: IVideo[];
}

export class Activity implements IActivity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public activityImageUrl?: string,
        public activityDate?: Moment,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public schedule?: ISchedule,
        public activityType?: IActivityType,
        public photos?: IPhoto[],
        public videos?: IVideo[]
    ) {}
}
