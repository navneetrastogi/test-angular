import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';
import { IRoom } from 'app/shared/model//room.model';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IIncident } from 'app/shared/model//incident.model';

export interface IStudent {
    id?: number;
    name?: string;
    createdOn?: Moment;
    lastModifiedOn?: Moment;
    center?: ICenter;
    room?: IRoom;
    studentProfile?: IStudentProfile;
    incident?: IIncident;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public name?: string,
        public createdOn?: Moment,
        public lastModifiedOn?: Moment,
        public center?: ICenter,
        public room?: IRoom,
        public studentProfile?: IStudentProfile,
        public incident?: IIncident
    ) {}
}
