import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';

export interface IHoliday {
    id?: number;
    date?: Moment;
    title?: string;
    description?: string;
    center?: ICenter;
}

export class Holiday implements IHoliday {
    constructor(public id?: number, public date?: Moment, public title?: string, public description?: string, public center?: ICenter) {}
}
