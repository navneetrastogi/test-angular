import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface IIllnessRecord {
    id?: number;
    createdOn?: Moment;
    name?: string;
    description?: string;
    isCured?: boolean;
    studentProfile?: IStudentProfile;
}

export class IllnessRecord implements IIllnessRecord {
    constructor(
        public id?: number,
        public createdOn?: Moment,
        public name?: string,
        public description?: string,
        public isCured?: boolean,
        public studentProfile?: IStudentProfile
    ) {
        this.isCured = this.isCured || false;
    }
}
