import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IStudent } from 'app/shared/model//student.model';

export interface IIncident {
    id?: number;
    natureOfIncident?: string;
    firstAidProvided?: boolean;
    firstAidNotes?: string;
    date?: Moment;
    createdOn?: Moment;
    isAdminOnly?: boolean;
    notes?: string;
    studentProfile?: IStudentProfile;
    students?: IStudent[];
}

export class Incident implements IIncident {
    constructor(
        public id?: number,
        public natureOfIncident?: string,
        public firstAidProvided?: boolean,
        public firstAidNotes?: string,
        public date?: Moment,
        public createdOn?: Moment,
        public isAdminOnly?: boolean,
        public notes?: string,
        public studentProfile?: IStudentProfile,
        public students?: IStudent[]
    ) {
        this.firstAidProvided = this.firstAidProvided || false;
        this.isAdminOnly = this.isAdminOnly || false;
    }
}
