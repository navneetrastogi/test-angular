import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model//schedule.model';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface ITimeline {
    id?: number;
    date?: Moment;
    isVisible?: Moment;
    schedule?: ISchedule;
    studentProfile?: IStudentProfile;
}

export class Timeline implements ITimeline {
    constructor(
        public id?: number,
        public date?: Moment,
        public isVisible?: Moment,
        public schedule?: ISchedule,
        public studentProfile?: IStudentProfile
    ) {}
}
