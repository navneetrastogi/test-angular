import { Moment } from 'moment';
import { ITeacher } from 'app/shared/model//teacher.model';
import { IParent } from 'app/shared/model//parent.model';

export const enum IllumineMediaType {
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO'
}

export interface IConversation {
    id?: number;
    text?: string;
    createdOn?: Moment;
    sentOn?: Moment;
    status?: string;
    fileUrl?: string;
    mediaType?: IllumineMediaType;
    teacher?: ITeacher;
    parent?: IParent;
}

export class Conversation implements IConversation {
    constructor(
        public id?: number,
        public text?: string,
        public createdOn?: Moment,
        public sentOn?: Moment,
        public status?: string,
        public fileUrl?: string,
        public mediaType?: IllumineMediaType,
        public teacher?: ITeacher,
        public parent?: IParent
    ) {}
}
