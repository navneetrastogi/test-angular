import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export const enum MediaType {
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO'
}

export interface IGallery {
    id?: number;
    mediaType?: MediaType;
    createdOn?: Moment;
    fileUrl?: string;
    title?: string;
    studentProfile?: IStudentProfile;
}

export class Gallery implements IGallery {
    constructor(
        public id?: number,
        public mediaType?: MediaType,
        public createdOn?: Moment,
        public fileUrl?: string,
        public title?: string,
        public studentProfile?: IStudentProfile
    ) {}
}