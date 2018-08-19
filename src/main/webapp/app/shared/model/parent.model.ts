import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IFeature } from 'app/shared/model//feature.model';
import { INotification } from 'app/shared/model//notification.model';
import { ITask } from 'app/shared/model//task.model';
import { IPermission } from 'app/shared/model//permission.model';
import { IConversation } from 'app/shared/model//conversation.model';

export const enum Relation {
    FATHER = 'FATHER',
    MOTHER = 'MOTHER',
    GUARDIAN = 'GUARDIAN'
}

export interface IParent {
    id?: number;
    name?: string;
    createdOn?: Moment;
    phoneNumber?: string;
    relation?: Relation;
    studentName?: string;
    isAccountActive?: boolean;
    email?: string;
    studentProfile?: IStudentProfile;
    features?: IFeature[];
    notifications?: INotification[];
    tasks?: ITask[];
    permissions?: IPermission[];
    conversations?: IConversation[];
}

export class Parent implements IParent {
    constructor(
        public id?: number,
        public name?: string,
        public createdOn?: Moment,
        public phoneNumber?: string,
        public relation?: Relation,
        public studentName?: string,
        public isAccountActive?: boolean,
        public email?: string,
        public studentProfile?: IStudentProfile,
        public features?: IFeature[],
        public notifications?: INotification[],
        public tasks?: ITask[],
        public permissions?: IPermission[],
        public conversations?: IConversation[]
    ) {
        this.isAccountActive = this.isAccountActive || false;
    }
}
