import { Moment } from 'moment';
import { IImmunizationRecord } from 'app/shared/model//immunization-record.model';
import { IIllnessRecord } from 'app/shared/model//illness-record.model';
import { IPayment } from 'app/shared/model//payment.model';
import { IKudosRecord } from 'app/shared/model//kudos-record.model';
import { IMilestoneRecord } from 'app/shared/model//milestone-record.model';
import { IAttendance } from 'app/shared/model//attendance.model';
import { IIncident } from 'app/shared/model//incident.model';
import { ITimeline } from 'app/shared/model//timeline.model';
import { IParent } from 'app/shared/model//parent.model';
import { IGallery } from 'app/shared/model//gallery.model';

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IStudentProfile {
    id?: number;
    dream?: string;
    birthDate?: Moment;
    bloodGroup?: string;
    gender?: Gender;
    immunizationRecords?: IImmunizationRecord[];
    illnessRecords?: IIllnessRecord[];
    payments?: IPayment[];
    kudosRecords?: IKudosRecord[];
    milestoneRecords?: IMilestoneRecord[];
    attendances?: IAttendance[];
    incidents?: IIncident[];
    timelines?: ITimeline[];
    parents?: IParent[];
    galleryItems?: IGallery[];
}

export class StudentProfile implements IStudentProfile {
    constructor(
        public id?: number,
        public dream?: string,
        public birthDate?: Moment,
        public bloodGroup?: string,
        public gender?: Gender,
        public immunizationRecords?: IImmunizationRecord[],
        public illnessRecords?: IIllnessRecord[],
        public payments?: IPayment[],
        public kudosRecords?: IKudosRecord[],
        public milestoneRecords?: IMilestoneRecord[],
        public attendances?: IAttendance[],
        public incidents?: IIncident[],
        public timelines?: ITimeline[],
        public parents?: IParent[],
        public galleryItems?: IGallery[]
    ) {}
}
