import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface IPayment {
    id?: number;
    studentProfile?: IStudentProfile;
}

export class Payment implements IPayment {
    constructor(public id?: number, public studentProfile?: IStudentProfile) {}
}
