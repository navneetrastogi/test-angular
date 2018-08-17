import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface IImmunizationRecord {
    id?: number;
    createdOn?: Moment;
    vaccinationDoneOn?: Moment;
    vaccinationName?: string;
    isOnTime?: boolean;
    studentProfile?: IStudentProfile;
}

export class ImmunizationRecord implements IImmunizationRecord {
    constructor(
        public id?: number,
        public createdOn?: Moment,
        public vaccinationDoneOn?: Moment,
        public vaccinationName?: string,
        public isOnTime?: boolean,
        public studentProfile?: IStudentProfile
    ) {
        this.isOnTime = this.isOnTime || false;
    }
}
