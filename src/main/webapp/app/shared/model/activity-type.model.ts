export interface IActivityType {
    id?: number;
    name?: string;
    category?: string;
}

export class ActivityType implements IActivityType {
    constructor(public id?: number, public name?: string, public category?: string) {}
}
