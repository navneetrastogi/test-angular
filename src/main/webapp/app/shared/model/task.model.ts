import { Moment } from 'moment';
import { IRoom } from 'app/shared/model//room.model';
import { IParent } from 'app/shared/model//parent.model';
import { ITaskType } from 'app/shared/model//task-type.model';

export const enum ReminderType {
    HOURLY = 'HOURLY',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY'
}

export interface ITask {
    id?: number;
    title?: string;
    notes?: string;
    startDate?: Moment;
    endDate?: Moment;
    reminderType?: ReminderType;
    room?: IRoom;
    parent?: IParent;
    taskType?: ITaskType;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public notes?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public reminderType?: ReminderType,
        public room?: IRoom,
        public parent?: IParent,
        public taskType?: ITaskType
    ) {}
}
