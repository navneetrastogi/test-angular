import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IKudos } from 'app/shared/model//kudos.model';

export interface IKudosRecord {
    id?: number;
    createdOn?: Moment;
    notes?: string;
    studentProfile?: IStudentProfile;
    kudos?: IKudos;
}

export class KudosRecord implements IKudosRecord {
    constructor(
        public id?: number,
        public createdOn?: Moment,
        public notes?: string,
        public studentProfile?: IStudentProfile,
        public kudos?: IKudos
    ) {}
}
