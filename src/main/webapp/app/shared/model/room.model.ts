import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';
import { IStudent } from 'app/shared/model//student.model';
import { ITask } from 'app/shared/model//task.model';
import { ISchedule } from 'app/shared/model//schedule.model';

export interface IRoom {
    id?: number;
    name?: string;
    capacity?: number;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    center?: ICenter;
    students?: IStudent[];
    tasks?: ITask[];
    schedule?: ISchedule;
}

export class Room implements IRoom {
    constructor(
        public id?: number,
        public name?: string,
        public capacity?: number,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public center?: ICenter,
        public students?: IStudent[],
        public tasks?: ITask[],
        public schedule?: ISchedule
    ) {}
}
