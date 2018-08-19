import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';
import { IConversation } from 'app/shared/model//conversation.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface ITeacher {
    id?: number;
    name?: string;
    contactNumber?: string;
    gender?: Gender;
    address?: string;
    createdOn?: Moment;
    joiningDate?: Moment;
    center?: ICenter;
    conversations?: IConversation[];
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public name?: string,
        public contactNumber?: string,
        public gender?: Gender,
        public address?: string,
        public createdOn?: Moment,
        public joiningDate?: Moment,
        public center?: ICenter,
        public conversations?: IConversation[]
    ) {}
}
