import { Moment } from 'moment';
import { IParent } from 'app/shared/model//parent.model';

export const enum NotificationStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    READ = 'READ'
}

export interface INotification {
    id?: number;
    type?: string;
    date?: Moment;
    createdOn?: Moment;
    message?: string;
    icon?: string;
    status?: NotificationStatus;
    parent?: IParent;
}

export class Notification implements INotification {
    constructor(
        public id?: number,
        public type?: string,
        public date?: Moment,
        public createdOn?: Moment,
        public message?: string,
        public icon?: string,
        public status?: NotificationStatus,
        public parent?: IParent
    ) {}
}
